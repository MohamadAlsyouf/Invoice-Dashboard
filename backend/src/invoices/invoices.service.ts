import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.invoice.findMany({
      where: { user_id: userId },
    });
  }

  async findOne(id: string, userId: string) {
    const invoice = await this.prisma.invoice.findFirst({
      where: {
        id,
        user_id: userId,
      },
    });

    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    return invoice;
  }

  async getTotal() {
    const invoices = await this.prisma.invoice.findMany({
      select: {
        amount: true,
        due_date: true,
      },
    });

    return invoices.reduce(
      (acc, curr) => {
        const date = curr.due_date.toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + curr.amount;
        return acc;
      },
      {} as Record<string, number>,
    );
  }
}
