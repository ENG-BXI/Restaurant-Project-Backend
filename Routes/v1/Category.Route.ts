import CategoryController from '@/Controllers/v1/Category.Controller';
import {Router} from 'express';

const CategoryRoute_v1 = Router();

CategoryRoute_v1.get('/', CategoryController.getCategories);
CategoryRoute_v1.post('/create-category', CategoryController.createCategory);
CategoryRoute_v1.get('/:id', CategoryController.getCategoryById);
CategoryRoute_v1.put('/:id', CategoryController.editCategory);
CategoryRoute_v1.delete('/:id', CategoryController.deleteCategory);

export default CategoryRoute_v1;
