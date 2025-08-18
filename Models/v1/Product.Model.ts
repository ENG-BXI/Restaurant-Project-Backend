import {PrismaClient} from '@/DB/prisma/client';

const prisma = new PrismaClient();

export interface IProduct {
  id?: string;
  title: string;
  categoryId: string;
  description: string;
  price: number;
  imageUrl: string;
  Category?: {title: string};
}

const ProductModel = prisma.product;
export default ProductModel;
