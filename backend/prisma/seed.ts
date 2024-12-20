import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create demo user
  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
      password: hashedPassword,
    },
  });

  // Create demo invoices
  const demoInvoices = [
    {
      vendor_name: 'Amazon',
      amount: 299.99,
      due_date: new Date('2024-03-31'),
      description: 'Rental',
      paid: true,
      user_id: user.id,
    },
    {
      vendor_name: 'Sysco',
      amount: 228.75,
      due_date: new Date('2024-03-31'),
      description: 'Rental',
      paid: false,
      user_id: user.id,
    },
    {
      vendor_name: 'Fiber Optics',
      amount: 150.0,
      due_date: new Date('2024-03-31'),
      description: 'Rental',
      paid: false,
      user_id: user.id,
    },
  ];

  for (const invoice of demoInvoices) {
    await prisma.invoice.create({
      data: invoice,
    });
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
