import { Module } from '@nestjs/common';
import { DMsService } from './dms.service';
import { DMsController } from './dms.controller';

@Module({
  providers: [DMsService],
  controllers: [DMsController]
})
export class DMsModule {}
