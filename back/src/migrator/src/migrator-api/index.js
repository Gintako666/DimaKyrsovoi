import fs from 'fs';
import { dump as toYAML, load as loadYaml } from 'js-yaml';
import diff from '../functions/diff.js';
import apply from '../functions/apply.js';
import createSnapshot from '../functions/createSnapshot.js';

export default (router, { services, getSchema, database }) =>
{
	router.get('/diff', async (req, res, next) =>
	{
		let snapshot = null;

		try
		{
			snapshot = fs.readFileSync(req.app.locals.migrator.snapshotFile);
			snapshot = loadYaml(snapshot);
		}
		catch (e)
		{
			next(e);
		}

		const snapshotDiff = await diff(snapshot, { services, schema: req.schema, database, force: 'force' in req.query });

		res.send(snapshotDiff);
	});

	router.get('/generate', async (req, res, next) =>
	{
		const snapshotFile = req.app.locals.migrator.snapshotFile;
		const snapshot = await createSnapshot({ schema: req.schema, services, database });

		if (fs.existsSync(snapshotFile))
		{
			fs.unlinkSync(snapshotFile);
		}

		fs.writeFileSync(snapshotFile, toYAML(snapshot));

		res.send(snapshot);
	});

	router.get('/apply', async (req, res, next) =>
	{
		let snapshot = null;

		try
		{
			snapshot = fs.readFileSync(req.app.locals.migrator.snapshotFile);
			snapshot = loadYaml(snapshot);
		}
		catch (e)
		{
			next(e);
		}

		const snapshotDiff = await diff(snapshot, { services, schema: req.schema, database, force: 'force' in req.query });

		await apply(snapshotDiff, null, { services, schema: req.schema, database, getSchema });

		res.send('OK');
	});

	// router.get('/schema', async (req, res, next) =>
	// {
	// 	res.send(req.schema);
	// });

	// router.get('/collections', async (req, res, next) =>
	// {
	// 	const { CollectionsService } = services;

	// 	const service = new CollectionsService({ schema: req.schema });
	// 	res.send(
	// 		await service.readByQuery({ limit: -1 })
	// 	);
	// });

	// router.get('/relations', async (req, res, next) =>
	// {
	// 	const { RelationsService } = services;

	// 	const service = new RelationsService({ schema: req.schema });
	// 	res.send(
	// 		await service.readAll()
	// 	);
	// });
};
