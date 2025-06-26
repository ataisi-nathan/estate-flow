import { Module } from '@nestjs/common';
import { TenantModule } from './modules/tenant.module';

@Module({
  imports: [TenantModule],
})
export class AppModule {}
