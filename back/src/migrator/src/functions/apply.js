import { intersection, isEqual, uniq } from 'lodash-es';

const apply = async (payload, settings, { services, schema, database, getSchema }) =>
{
    const { SchemaService, RelationsService, ItemsService } = services;

    const schemaService = new SchemaService({ accountability: { admin: true } });
    
    const filteredDiff = { ...payload, diff: { ...payload.diff, data: null } };
    delete filteredDiff.diff.data;
    
    await schemaService.apply(filteredDiff);

    const newSchema = await getSchema();
    const relationsService = new RelationsService({ schema: newSchema, accountability: { admin: true } });
    const relations = await relationsService.readAll();

    let allowedCollections = Object.keys(payload.diff.data);

    if (Array.isArray(settings?.includeCollections))
    {
        allowedCollections = intersection(allowedCollections, settings?.includeCollections);
    }

    const addSingleItem = async (collection, data) =>
    {
        const service = new ItemsService(collection, { schema: newSchema });
        const oneField = relations.find((el) => el.related_collection === collection && el.meta.one_field);
        const primaryKey = newSchema.collections[collection]?.primary;

        // if (!primaryKey)
        // {
        //     console.log('No primary', collection);
        //     return;
        // }

        if (oneField)
        {
            data[oneField.meta?.one_field] = [];
        }

        console.log('addSingleItem', collection, data[primaryKey]);

        const stillNeedToAdd = payload.diff.data[collection].find((el) => el.kind === 'D' && el.path[0] == data[primaryKey]);

        if (!stillNeedToAdd)
        {
            console.log('No more need to add');
            return;
        }

        const loops = relations
            .filter((el) => el.collection === collection && el.related_collection === collection);

        if (loops.length)
        {
            // console.log('LOOPS', loops);

            for (let j = 0; j < loops.length; j += 1)
            {
                const field = loops[j].field;

                if (data[field] === null)
                {
                    continue;
                }

                const foreignField = loops[j].schema.foreign_key_column;
                const foreignItem = await service.readByQuery({
                    filter: {
                        [foreignField]: {
                            _eq: data[field],
                        },
                    },
                });

                if (!foreignItem.length)
                {
                    console.log('Found unexisting dependency', collection, foreignField, '=', data[field]);

                    const foreignItem = payload.diff.data[collection].find((el) => el.kind === 'D' && el.lhs[foreignField] === data[field]);
                    
                    if (!foreignItem)
                    {
                        throw new Error('Can\'t find foreign item...');
                    }

                    await addSingleItem(collection, foreignItem.lhs);
                }
            }
        }

        await service.createOne(
            data,
            {
                emitEvents: false,
            },
        );

        // Special behavior for password field
        if (collection === 'directus_users')
        {
            await database(collection)
                .where(primaryKey, data[primaryKey])
                .update({
                    password: data.password
                });
        }

        payload.diff.data[collection] = payload.diff.data[collection].filter((el) => el.kind !== 'D' || el.kind === 'D' && el.path[0] != data[primaryKey]);
    };

    // Add deleted items
    const addData = async (collections, stack = []) =>
    {
        if (stack.find((el) => isEqual(el, collections)))
        {
            console.log('[addData] Loop detected');
            return;
        }

        for (let i = 0; i < collections.length; i += 1)
        {
            const collection = collections[i];

            const foreignCollections = relations
                .filter((el) => el.collection === collection && el.related_collection !== collection)
                .map((el) => el.related_collection);

            if (foreignCollections.length)
            {
                // console.log('foreignCollections', collection, foreignCollections);
                await addData(uniq(foreignCollections), [ ...stack, collections ]);
            }

            const collectionDiff = payload.diff.data[collection];
            
            if (!collectionDiff)
            {
                continue;
            }

            const itemsToAdd = collectionDiff.filter((el) => el.kind === 'D');

            if (!allowedCollections.includes(collection))
            {
                console.log('[addData] Ignoring collection', collection);
                return;
            }

            for (let j = 0; j < itemsToAdd.length; j += 1)
            {
                await addSingleItem(collection, itemsToAdd[j].lhs);
            }
        }
    };

    // Delete added items
    const deleteData = async (collections, stack = []) =>
    {
        if (stack.find((el) => isEqual(el, collections)))
        {
            console.log('[deleteData] Loop detected');
            return;
        }

        for (let i = 0; i < collections.length; i += 1)
        {
            const collection = collections[i];
            const collectionDiff = payload.diff.data[collection];

            if (!collectionDiff)
            {
                continue;
            }

            const itemsToDelete = collectionDiff.filter((el) => el.kind === 'N');

            if (!itemsToDelete.length)
            {
                continue;
            }

            const foreignCollections = relations
                .filter((el) => el.related_collection === collection && el.collection !== collection)
                .map((el) => el.collection);

            if (foreignCollections.length)
            {
                await deleteData(uniq(foreignCollections), [ ...stack, collections ]);
                await updateData(uniq(foreignCollections));
            }

            const service = new ItemsService(collection, { schema: newSchema, accountability: { admin: true } });

            if (!allowedCollections.includes(collection))
            {
                console.log('[deleteData] Ignoring collection', collection);
                return;
            }

            const filtered = [];
            
            for (let j = 0; j < itemsToDelete.length; j++)
            {
                if (itemsToDelete[j].path.length !== 1)
                {
                    console.log('[deleteData] ignoring deep change');
                    continue;
                }

                filtered.push(itemsToDelete[j]);
            }

            await service.deleteMany(
                filtered.map((el) => el.path[0]),
                {
                    emitEvents: false,
                },
            );

            payload.diff.data[collection] = payload.diff.data[collection].filter((el) => el.kind !== 'N');
        }
    };

    // Update items
    const updateData = async (collections) =>
    {
        for (let i = 0; i < collections.length; i += 1)
        {
            const collection = collections[i];
            const collectionDiff = payload.diff.data[collection];

            if (!collectionDiff)
            {
                continue;
            }

            const itemsToUpdate = collectionDiff.filter((el) => el.kind === 'E');

            if (!itemsToUpdate.length)
            {
                continue;
            }

            const service = new ItemsService(collection, { schema: newSchema });
            const primaryKey = newSchema.collections[collection].primary;

            if (!allowedCollections.includes(collection))
            {
                console.log('[updateData] Ignoring collection', collection);
                return;
            }

            for (let k = 0; k < itemsToUpdate.length; k += 1)
            {
                const field = itemsToUpdate[k].path[1];

                // Special behavior for password field
                if (collection === 'directus_users' && field === 'password')
                {
                    await database(collection)
                        .where(primaryKey, itemsToUpdate[k].path[0])
                        .update({
                            [field]: itemsToUpdate[k].lhs,
                        });
                }
                else
                {
                    await service.updateOne(
                        itemsToUpdate[k].path[0],
                        {
                            [field]: itemsToUpdate[k].lhs,
                        },
                        {
                            emitEvents: false,
                        },
                    );
                }
            }

            payload.diff.data[collection] = payload.diff.data[collection].filter((el) => el.kind !== 'E');
        }
    };

    // console.log('--------------------------------');
    // console.log(payload.diff.data.directus_users);

    console.log(`Applying data for collections ${ allowedCollections.join(', ') }...`);

    await deleteData(allowedCollections);
    await addData(allowedCollections);
    await updateData(allowedCollections);

    // Update autoincrement values for tables with autoincrement enabled
    // It's PostgreSQL-related issue

    for (const key in newSchema.collections)
    {
        const collection = newSchema.collections[key];

        if (collection.fields[collection.primary].defaultValue === 'AUTO_INCREMENT')
        {
            await database.raw(`select setval(\'"${ collection.collection }_${ collection.primary }_seq"\', max(${ collection.primary })) from "${ collection.collection }"`);
        }
    }
};

export default apply;
