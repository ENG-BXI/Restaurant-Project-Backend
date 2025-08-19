import express from 'express';
import ProductController from '@/Controllers/v1/Product.Controller';
const ProductRoute = express.Router();

ProductRoute.get('/', ProductController.getProducts);
ProductRoute.post('/create-product', ProductController.createProduct);
ProductRoute.get('/:id', ProductController.getProductById);
ProductRoute.put('/:id', ProductController.editProduct);
ProductRoute.delete('/:id', ProductController.deleteProduct);


export default ProductRoute;
