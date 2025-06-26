/// apps/auth-service/src/services/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@estate-flow/shared/db';
import { signToken } from '@estate-flow/shared/auth';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login({ email, password }: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }
    const token = signToken({ sub: user.id, role: user.role, tenantId: user.tenantId });
    return { token };
  }

  async register({ email, password, role, tenantId }: { email: string; password: string; role: string; tenantId: string }) {
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { email, password: hashed, role: role as Role, tenantId },
    });
    return user;
  }

  async registerBuyer({ email, password, tenantDomain }: { email: string; password: string; tenantDomain: string }) {
    const tenant = await this.prisma.tenant.findUnique({ where: { domain: tenantDomain } });
    if (!tenant) throw new UnauthorizedException('Tenant not found');
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { email, password: hashed, role: 'BUYER' as Role, tenantId: tenant.id },
    });
    return user;
  }
}