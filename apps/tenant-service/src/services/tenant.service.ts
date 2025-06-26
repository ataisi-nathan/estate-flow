import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@estate-flow/libs/db';
import { CreateTenantDto } from '../dto/create-tenant.dto';

@Injectable()
export class TenantService {
  constructor(private readonly prisma: PrismaService) {}

  async createTenant(data: CreateTenantDto) {
    const existing = await this.prisma.tenant.findUnique({
      where: { domain: data.domain },
    });

    if (existing) {
      throw new BadRequestException('Domain already exists');
    }

    return this.prisma.tenant.create({
      data: {
        name: data.name,
        domain: data.domain,
        logoUrl: data.logoUrl || '',
      },
    });
  }
}
