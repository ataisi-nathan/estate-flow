import { Controller, Post, Body } from '@nestjs/common';
import { TenantService } from '../services/tenant.service';
import { CreateTenantDto } from '../dto/create-tenant.dto';

@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  async createTenant(@Body() body: CreateTenantDto) {
    return this.tenantService.createTenant(body);
  }
}
