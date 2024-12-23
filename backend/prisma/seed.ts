import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  // Create demo user
  const hashedPassword = await bcrypt.hash('password1234', 10);
  const user = await prisma.user.create({
    data: {
      id: randomUUID(),
      email: 'demo@altametrics.com',
      password: hashedPassword,
      name: 'Demo User',
    },
  });

  // Create demo invoices
  const invoices = await Promise.all([
    prisma.invoice.createMany({
      data: [
        {
          id: randomUUID(),
          vendor_name: 'Amazon',
          amount: 0,
          // date: new Date('2024-09-11'),
          due_date: new Date('2024-10-31'),
          description: 'Rental',
          user_id: user.id,
          paid: true,
        },
        {
          id: randomUUID(),
          vendor_name: 'Sysco',
          amount: 228.75,
          // date: new Date('2024-09-11'),
          due_date: new Date('2024-10-31'),
          description: 'Rental',
          user_id: user.id,
          paid: false,
        },
        {
          id: randomUUID(),
          vendor_name: 'US Foods',
          amount: 400.0,
          // date: new Date('2024-09-11'),
          due_date: new Date('2024-10-31'),
          description: 'Rental',
          user_id: user.id,
          paid: true,
        },
        {
          id: randomUUID(),
          vendor_name: 'Retal Inc',
          amount: 350.49,
          // date: new Date('2024-09-11'),
          due_date: new Date('2024-10-31'),
          description: 'Rental',
          user_id: user.id,
          paid: true,
        },
        {
          id: randomUUID(),
          vendor_name: 'Fiber Optics',
          amount: 150.0,
          // date: new Date('2024-09-11'),
          due_date: new Date('2024-10-31'),
          description: 'Rental',
          user_id: user.id,
          paid: false,
        },
        {
          id: randomUUID(),
          vendor_name: 'Ikea',
          amount: 467.88,
          // date: new Date('2024-09-11'),
          due_date: new Date('2024-10-31'),
          description: 'Rental',
          user_id: user.id,
          paid: true,
        },
        {
          id: randomUUID(),
          vendor_name: 'Costco',
          amount: 0,
          // date: new Date('2024-09-11'),
          due_date: new Date('2024-10-31'),
          description: 'Rental',
          user_id: user.id,
          paid: true,
        },
        {
          id: randomUUID(),
          vendor_name: 'Office Depot',
          amount: 214.23,
          // date: new Date('2024-09-11'),
          due_date: new Date('2024-10-31'),
          description: 'Rental',
          user_id: user.id,
          paid: true,
        },
        {
          id: randomUUID(),
          vendor_name: 'Altametrics',
          amount: 350.0,
          // date: new Date('2024-09-11'),
          due_date: new Date('2024-10-31'),
          description: 'Rental',
          user_id: user.id,
          paid: false,
        },
      ],
    }),
  ]);
  console.log('🚀 ~ main ~ invoices:', invoices);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
