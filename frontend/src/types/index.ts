import { z } from "zod";

// User schemas
export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Invoice schema
export const invoiceSchema = z.object({
  id: z.string().uuid(),
  payee: z.string(),
  amount: z.number(),
  due_date: z.string().datetime(),
  description: z.string(),
  paid: z.boolean(),
  user_id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Types inferred from schemas
export type User = z.infer<typeof userSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;
export type Invoice = z.infer<typeof invoiceSchema>;

// API Response types
export interface AuthResponse {
  access_token: string;
  user: User;
}
