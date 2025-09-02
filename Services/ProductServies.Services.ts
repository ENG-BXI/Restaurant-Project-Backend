import {ProductOrderByWithRelationInput} from '@/DB/prisma/models';
import ProductModel, {IProduct} from '@/Models/v1/Product.Model';
import ParseErrorMessage from '@/Utils/ParseErrorMessage';

async function Products(page: number, limit: number, sort: string, search?: string) {
  const skip = (page - 1) * limit;
  const searchQ = search
    ? {
        OR: [{title: {contains: search}}, {description: {contains: search}}, {Category: {title: {contains: search}}}]
      }
    : {};
  const sortQ: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[] = sort !== 'title' ? {[sort]: 'asc'} : {title: 'asc'};

  try {
    const Products = await ProductModel.findMany({
      take: limit,
      skip,
      include: {Category: {select: {title: true}}},
      orderBy: sortQ,
      where: searchQ
    });
    return Products;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}
async function NumberOfProduct() {
  try {
    const numberOfProduct = await ProductModel.count();
    return numberOfProduct;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}
async function ProductById(id: string) {
  try {
    const Product = await ProductModel.findUnique({
      where: {id},
      include: {Category: {select: {title: true}}}
    });
    return Product;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

async function CreateProduct(product: IProduct) {
  try {
    const Product = await ProductModel.create({
      data: {
        title: product.title,
        description: product.description,
        imageUrl: product.imageUrl!,
        price: Number(product.price),
        Category: {connect: {id: product.categoryId}}
      },
      include: {Category: true}
    });
    return Product;
  } catch (error) {
    console.error(error);
    throw new Error(JSON.stringify(error));
  }
}

async function DeleteProduct(id: string) {
  try {
    const Product = await ProductModel.delete({where: {id}});
    return Product;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

async function EditProduct(id: string, product: IProduct) {
  const Product = await ProductModel.update({
    where: {id},
    data: {
      title: product.title,
      description: product.description,
      imageUrl: product.imageUrl,
      price: product.price,
      categoryId: product.categoryId
    },
    include: {Category: true}
  });
  return Product;
}

const ProductServices = {
  Products,
  NumberOfProduct,
  ProductById,
  CreateProduct,
  DeleteProduct,
  EditProduct
};

export default ProductServices;
