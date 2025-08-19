import {PrismaClient} from '@/DB/prisma/client';
import z, {object} from 'zod';
const prisma = new PrismaClient();

export const ProductZodSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  categoryId: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number().min(1),
  imageUrl: z.url().min(1),
  Category: z
    .object({
      title: z.string().min(1)
    })
    .optional()
});

export type IProduct = z.infer<typeof ProductZodSchema>;
const ProductModel = prisma.product;
export default ProductModel;
