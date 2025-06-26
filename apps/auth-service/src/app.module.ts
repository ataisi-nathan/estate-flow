import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth.module';
import { DbModule } from '../../../libs/db/src';

@Module({
  imports: [AuthModule, DbModule],
})
export class AppModule {}
