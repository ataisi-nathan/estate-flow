import { Module } from '@nestjs/common';
import { DbModule } from '@estate-flow/libs/db';
import { TenantService } from '../services/tenant.service';
import { TenantController } from '../controllers/tenant.controller';

@Module({
  imports: [DbModule], // ✅ shared PrismaService
  controllers: [TenantController],
  providers: [TenantService],
})
export class TenantModule {}
