/// tools/seed.ts

import { PrismaClient } from '../libs/db/src/lib/generated/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { domain: 'demo.localhost' },
    update: {},
    create: {
      name: 'DemoCorp',
      domain: 'demo.localhost',
      logoUrl: '',
    },
  });

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'admin@demo.local' },
    update: {},
    create: {
      email: 'admin@demo.local',
      password: hashedPassword,
      role: 'COMPANY_ADMIN',
      tenantId: tenant.id,
    },
  });

  await prisma.property.createMany({
    data: [
      {
        title: 'Luxury Villa',
        price: 950000,
        type: 'villa',
        imageUrl: '',
        tenantId: tenant.id,
        agentId: user.id,
      },
      {
        title: 'Urban Apartment',
        price: 400000,
        type: 'apartment',
        imageUrl: '',
        tenantId: tenant.id,
        agentId: user.id,
      },
    ],
    skipDuplicates: true,
  });

    await prisma.user.upsert({
        where: { email: 'buyer@demo.local' },
        update: {},
        create: {
        email: 'buyer@demo.local',
        password: await bcrypt.hash('buyer123', 10),
        role: 'BUYER',
        tenantId: tenant.id,
        },
    });

    await prisma.user.upsert({
        where: { email: 'superadmin@estateflow.local' },
        update: {},
        create: {
        email: 'superadmin@estateflow.local',
        password: await bcrypt.hash('superadmin123', 10),
        role: 'SUPER_ADMIN',
        tenantId: null,
        },
    });
}

main().finally(() => prisma.$disconnect());