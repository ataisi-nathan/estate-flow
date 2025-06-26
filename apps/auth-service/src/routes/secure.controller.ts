import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RolesGuard, Roles } from '@estate-flow/shared/auth';
import { PrismaClient } from '@estate-flow/shared/db';

const prisma = new PrismaClient();

@Controller('secure')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SecureController {
  @Get('admin')
  @Roles('COMPANY_ADMIN')
  getAdminData() {
    return { message: 'Access granted for company admin.' };
  }

  @Get('tenants')
  @Roles('SUPER_ADMIN')
  async getAllTenants() {
    const tenants = await prisma.tenant.findMany();
    return tenants;
  }
}
