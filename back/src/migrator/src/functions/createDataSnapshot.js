const collectionsToExclude = [
    'directus_collections',
    'directus_relations',
    'directus_fields',
    'directus_activity',
    'directus_revisions',
];

const createDataSnapshot = async ({ schema, services, database }) =>
{
    const { CollectionsService, ItemsService } = services;

    const collectionsService = new CollectionsService({ schema });
    const collections = await collectionsService.readByQuery({ limit: -1 });

    const result = {};

    for (let i = 0; i < collections.length; i += 1)
    {
        const collection = collections[i];
        const primaryKey = schema.collections[collection.collection]?.primary;

        if (collectionsToExclude.includes(collection.collection) || !collection.meta || !primaryKey)
        {
            continue;
        }

        // const service = new ItemsService(collection.collection, { schema });
        // const data = await service.readByQuery({
        //     limit: -1,
        // }).then((data) =>
        // {
        //     return data.reduce((accum, item) =>
        //     {
        //         accum[item[primaryKey]] = item;

        //         return accum;
        //     }, {});
        // });

        const data = await database(collection.collection)
            .select()
            .then((data) =>
            {
                return data.reduce((accum, item) =>
                {
                    accum[item[primaryKey]] = JSON.parse(JSON.stringify(item));

                    return accum;
                }, {});
            });

        result[collection.collection] = data;
    }

    return result;
};

export default createDataSnapshot;
