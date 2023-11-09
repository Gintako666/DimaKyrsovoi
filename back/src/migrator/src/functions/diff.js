import deepDiff from 'deep-diff';
import createDataSnapshot from './createDataSnapshot.js';
import hash from 'object-hash';

const getVersionedHash = (item) =>
{
    const version = '12.1.2';
	return hash({ item, version });
};

const diff = async (snapshot, { services, schema, database, force }) =>
{
    const { SchemaService } = services;

    const service = new SchemaService({ accountability: { admin: true } });
    const currentSnapshot = await service.snapshot();
    const currentDataSnapshot = await createDataSnapshot({ services, schema, database });

    const filteredSnapshot = { ...snapshot };
    delete filteredSnapshot.data;
    delete filteredSnapshot.seeds;

    const snapshotDiff = await service.diff(filteredSnapshot, { currentSnapshot, force });

    const dataDiff = {};

    for (let collection in snapshot.data)
    {
        let diff = deepDiff.diff(snapshot.data[collection], currentDataSnapshot[collection] || {});

        if (diff)
        {
            dataDiff[collection] = diff;
        }
    }

    return {
        diff: {
            collections: snapshotDiff?.collections || [],
            relations: snapshotDiff?.relations || [],
            fields: snapshotDiff?.fields || [],
            data: dataDiff,
        },
        hash: getVersionedHash(currentSnapshot),
    };
};

export default diff;
