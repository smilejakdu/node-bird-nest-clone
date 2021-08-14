import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { Channels } from 'src/entities/Channels';
import { Workspaces } from 'src/entities/Workspaces';

export class CreateInitialData implements Seeder{
	public async run(factory: Factory, connection: Connection):Promise<any> {
		await connection
			.createQueryBuilder()
			.insert()
			.into(Workspaces)
			.values([{ id: 1, name: 'Sleact', url: 'sleact' }]);
		await connection
			.createQueryBuilder()
			.insert()
			.into(Channels)
		  .values([{ id: 1, name: '일반', WorkspaceId : 1 , private : false }]);
	}
}