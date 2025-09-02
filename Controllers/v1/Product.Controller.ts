import {IProduct, ProductZodSchema} from '@/Models/v1/Product.Model';
import ProductServices from '@/Services/ProductServies.Services';
import ParseErrorMessage from '@/Utils/ParseErrorMessage';
import {type Request, type Response} from 'express';

async function getProducts(req: Request, res: Response) {
  try {
    const query = req.query;
    const page = parseInt((query.page as string) ?? '1') || 1;
    const limit = parseInt((query.limit as string) ?? '5') ?? 5;
    const sort = (query.sort as string) ?? 'title';
    const search = query.search as string | undefined;
    const products = await ProductServices.Products(page, limit, sort, search);
    const NumberOfProduct = await ProductServices.NumberOfProduct();
    const numberOfPages = Math.ceil(NumberOfProduct / limit);
    res.status(200).json({data: products, count: products.length, numberOfPages, page});
  } catch (error) {
    res.status(400).json({message: 'Get Products Failed', error: ParseErrorMessage(error)});
  }
}

async function getProductById(req: Request, res: Response) {
  try {
    const {id} = await req.params;
    if (!id) res.status(404).send({message: 'Id Cannot Be Found'});
    const product = await ProductServices.ProductById(id!);
    const validation = ProductZodSchema.safeParse(product);
    if (!product) res.status(404).send({message: 'Cannot Found This Product'});
    if (!validation.success) res.status(404).send({message: 'Cannot Found This Product', error: validation.error});
    res.status(200).json({message: 'Get Product Successful', data: product});
  } catch (error) {
    res.status(400).json({message: 'Get Products Failed', error: ParseErrorMessage(error)});
  }
}

async function createProduct(req: Request, res: Response) {
  const product: IProduct = JSON.parse(req.body.data);
  const validation = ProductZodSchema.safeParse(product);
  const imageFile = req.file;
  console.log(imageFile);

  if (!imageFile) {
    res.status(400).json({message: 'Image Not Found'});
    return;
  }
  if (!validation.success)
    res.status(401).json({
      message: 'Product Data inValid',
      error: validation.error
    });
  try {
    const newProduct = await ProductServices.CreateProduct({...product, imageUrl: `${imageFile.destination}/${imageFile.filename}`});
    res.status(200).json({
      message: 'Create New Product Successful',
      data: newProduct
    });
  } catch (error) {
    res.status(400).json({
      message: 'Create New Product Failed',
      data: {},
      error: ParseErrorMessage(error)
    });
  }
}

async function editProduct(req: Request, res: Response) {
  const imageFile = req.file;
  const {id} = req.params;
  if (!id) res.status(400).json({message: 'Id Not Found'});
  let product: IProduct = JSON.parse(req.body.data);
  console.log(product);
  if (imageFile) product = {...product, imageUrl: `${req.file?.destination}/${req.file?.filename}`};
  if (!product.categoryId && !product.description && !product.imageUrl && !product.price && !product.title) res.status(400).json({message: 'Product Data inValid'});
  const editedProduct = await ProductServices.EditProduct(id, product);
  const validation = ProductZodSchema.safeParse(editedProduct);
  if (!validation.success)
    res.status(200).json({
      message: 'Edit Product Failed',
      error: validation.error
    });

  res.status(200).json({
    message: 'Edit Product Successful',
    data: editedProduct
  });
}

async function deleteProduct(req: Request, res: Response) {
  const {id} = req.params;
  if (!id) res.status(400).json({message: 'Id Not Found'});
  try {
    const deletedProduct = await ProductServices.DeleteProduct(id);
    res.status(200).json({message: 'Delete Product Successful', data: deletedProduct});
  } catch (error) {
    console.log('error in Controller ', error);
    res.status(400).json({message: 'Delete Product Failed', error: ParseErrorMessage(error)});
  }
}

const ProductController = {
  getProducts,
  getProductById,
  createProduct,
  editProduct,
  deleteProduct
};

export default ProductController;
