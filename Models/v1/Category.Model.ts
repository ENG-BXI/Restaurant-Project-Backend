import {PrismaClient} from '@/DB/prisma/client';
import z from 'zod';
import {ProductZodSchema} from './Product.Model';
const prisma = new PrismaClient();

export const CategoryZodSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  Products: z.array(ProductZodSchema).optional()
});

export type ICategory = z.infer<typeof CategoryZodSchema>;

export const CategoryModel = prisma.category;
