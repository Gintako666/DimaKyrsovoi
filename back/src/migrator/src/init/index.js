import fs from 'fs';
import { dump as toYAML, load as loadYaml } from 'js-yaml';
import diff from './../functions/diff.js';
import apply from './../functions/apply.js';
import createSnapshot from './../functions/createSnapshot.js';

const snapshotFile = './snapshot/snapshot.yml';

export default ({ init, embed }, { services, database, getSchema }) =>
{
	if (process.env.PHASE !== 'production')
	{
		embed(
			'body',
			() =>
			{
				let color = 'var(--foreground-subdued)';

				switch (process.env.PHASE)
				{
					case 'development':
						color = 'red';
						break;
					case 'staging':
						color = 'orange';
						break;
				}

				return `
<style>
#directus .public-view .subtitle,
#directus .project-info .descriptor {
	font-size: 0;
}
#directus .public-view .subtitle:before,
#directus .project-info .descriptor:before {
	color: ${ color };
	content: '${ process.env.PHASE } phase';
	font-size: 1rem;
	text-transform: capitalize;
}
</style>
`;
			}
		);
	}
	
	init('app.before', async ({ app }) =>
	{
		try
		{
			app.locals.migrator = {
				snapshotFile,
			};
	
			const schema = await getSchema();
	
			if (!fs.existsSync(snapshotFile))
			{
				console.log('Snaphot file not found. Creating a new one...');
				const snapshot = await createSnapshot({ schema, services, database });
	
				fs.writeFileSync(snapshotFile, toYAML(snapshot));
			}
			else
			{
				let snapshot = null;
		
				try
				{
					snapshot = fs.readFileSync(snapshotFile);
					snapshot = loadYaml(snapshot);

					for (const collection in snapshot.data)
					{
						for (const itemId in snapshot.data[collection])
						{
							for (const property in snapshot.data[collection][itemId])
							{
								if (typeof snapshot.data[collection][itemId][property] === 'object'
									&& snapshot.data[collection][itemId][property] !== null
								)
								{
									snapshot.data[collection][itemId][property] = JSON.stringify(snapshot.data[collection][itemId][property]);
								}
							}
						}
					}
				}
				catch (e)
				{
					throw e;
				}
	
				const snapshotDiff = await diff(snapshot, { services, database, schema });
				let applySettings = null;
	
				if (process.env.PHASE === 'production' || process.env.PHASE === 'staging')
				{
					applySettings = {
						includeCollections: [
							'directus_roles',
							'directus_permissions',
							'directus_presets',
							'directus_dashboards',
							'directus_panels',
							'directus_flows',
							'directus_operations',
						],
					};
				}
	
				await apply(snapshotDiff, applySettings, { services, schema, database, getSchema });
	
				console.log('Snapshot applied');
			}
		}
		catch (e)
		{
			console.log('Snapshot applying error:');
			console.log(e);

			process.exit(1);
		}
	});
};
