import {PrismaClient} from '@/DB/prisma/client';
import z from 'zod';
const prisma = new PrismaClient();

export const ProductZodSchema = z.object({
  id: z.string().optional(),
  title: z.coerce.string().min(1),
  categoryId: z.string().min(1),
  description: z.coerce.string().min(1),
  price: z.coerce.number().min(1),
  imageUrl: z.string().optional(),
  Category: z
    .object({
      title: z.coerce.string().min(1)
    })
    .optional()
});

export type IProduct = z.infer<typeof ProductZodSchema>;
const ProductModel = prisma.product;
export default ProductModel;
