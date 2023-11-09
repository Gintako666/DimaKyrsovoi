import createDataSnapshot from './createDataSnapshot.js';

const dataCollections = [
	'directus_dashboards',
	'directus_flows',
	'directus_panels',
	'directus_permissions',
	'directus_presets',
	'directus_roles',
];

const createSnapshot = async ({ schema, services, database }) =>
{
    const { SchemaService } = services;

    const schemaService = new SchemaService({ accountability: { admin: true } });
    const currentSnapshot = await schemaService.snapshot();

    currentSnapshot.data = await createDataSnapshot({ schema, services, database });

    return currentSnapshot;
};

export default createSnapshot;