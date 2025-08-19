import {PrismaClient} from '@/DB/prisma/client';
import z from 'zod';
const prisma = new PrismaClient();
export const CustomerReviewZodSchema = z.object({
  id: z.string().optional(),
  numberOfStar: z.coerce.number().min(0).max(5),
  text: z.string().min(1),
  authorName: z.string().min(1)
});

export type ICustomerReview = z.infer<typeof CustomerReviewZodSchema>;

export const CustomerReviewModel = prisma.customerReview;
