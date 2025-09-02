import express from 'express';
import ProductController from '@/Controllers/v1/Product.Controller';
import {VerifyToken} from '@/Middleware/VerifyToken';
import {VerifyAdmin} from '@/Middleware/VerifyAdmin';
import multer from 'multer';
const ProductRoute = express.Router();

const storage = multer.diskStorage({
  destination: (_, file, cb) => {
    cb(null, 'uploads/products');
  },
  filename: (_, file, cb) => {
    const type = file.mimetype.split('/')[0];
    if (type !== 'image') cb(Error('Upload Image Not' + type), '');
    const ext = file.mimetype.split('/')[1];
    const fileName = `product-${Date.now()}.${ext}`;
    cb(null, fileName);
  }
});
const upload = multer({storage: storage});

ProductRoute.get('/', ProductController.getProducts);
ProductRoute.post('/create-product', VerifyToken, VerifyAdmin, upload.single('image'), ProductController.createProduct);
ProductRoute.get('/:id', ProductController.getProductById);
ProductRoute.put('/:id', VerifyToken, VerifyAdmin, upload.single('image'), ProductController.editProduct);
ProductRoute.delete('/:id', VerifyToken, VerifyAdmin, ProductController.deleteProduct);

export default ProductRoute;
