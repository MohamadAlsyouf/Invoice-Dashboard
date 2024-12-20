import { z } from 'zod';
import { userResponseDtoSchema } from '../../users/dto/user-response.dto';

export const invoiceResponseDtoSchema = z.object({
  id: z.string().uuid(),
  vendor_name: z.string(),
  amount: z.number(),
  due_date: z.date().or(z.string()),
  description: z.string(),
  paid: z.boolean(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
  user: userResponseDtoSchema.optional(),
});

export type InvoiceResponseDto = z.infer<typeof invoiceResponseDtoSchema>;
