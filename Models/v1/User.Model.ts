import {PrismaClient} from '@/DB/prisma/client';
import z from 'zod';

export const UserSchema = z.object({
  id: z.string().optional(),
  email: z.email().min(1),
  password: z.string(),
  role: z.enum(['User', 'Admin'])
});

export type IUser = z.infer<typeof UserSchema>;

const prisma = new PrismaClient();
export const User = prisma.user;
