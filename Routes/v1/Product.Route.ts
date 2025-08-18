import express from 'express';
import ProductController from '@/Controllers/v1/Product.Controller';
const ProductRoute = express.Router();

ProductRoute.get('/', ProductController.getProducts);
ProductRoute.get('/:id', ProductController.getProductById);
ProductRoute.put('/:id', ProductController.editProduct);
ProductRoute.delete('/:id', ProductController.deleteProduct);
ProductRoute.post('/create-product', ProductController.createProduct);

export default ProductRoute;
