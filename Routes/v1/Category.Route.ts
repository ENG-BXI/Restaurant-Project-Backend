import CategoryController from '@/Controllers/v1/Category.Controller';
import { VerifyAdmin } from '@/Middleware/VerifyAdmin';
import { VerifyToken } from '@/Middleware/VerifyToken';
import {Router} from 'express';

const CategoryRoute_v1 = Router();

CategoryRoute_v1.get('/', CategoryController.getCategories);
CategoryRoute_v1.post('/create-category',VerifyToken,VerifyAdmin, CategoryController.createCategory);
CategoryRoute_v1.get('/:id', CategoryController.getCategoryById);
CategoryRoute_v1.put('/:id',VerifyToken,VerifyAdmin, CategoryController.editCategory);
CategoryRoute_v1.delete('/:id',VerifyToken,VerifyAdmin, CategoryController.deleteCategory);

export default CategoryRoute_v1;
