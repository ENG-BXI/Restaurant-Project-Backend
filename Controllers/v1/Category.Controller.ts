import {CategoryModel, CategoryZodSchema} from '@/Models/v1/Category.Model';
import CategoryServices from '@/Services/CategoryServices.Services';
import ParseErrorMessage from '@/Utils/ParseErrorMessage';
import {Request, Response} from 'express';

async function getCategories(req: Request, res: Response) {
  try {
    const Categories = await CategoryServices.getCategories();
    res.status(200).json({message: 'Get Categories Successful', data: Categories});
  } catch (error) {
    res.status(400).json({message: 'Get Categories Failed', error: ParseErrorMessage(error)});
  }
}
async function createCategory(req: Request, res: Response) {
  const {title} = req.body;
  if (!title) res.status(400).json({message: 'Cannot Found Category Title'});
  try {
    const newCategory = await CategoryServices.createCategory(title);
    res.status(200).json({message: 'Create Category Successful', data: newCategory});
  } catch (error) {
    res.status(400).json({message: 'Create Category Failed', error: ParseErrorMessage(error)});
  }
}
async function getCategoryById(req: Request, res: Response) {
  const {id} = req.params;
  if (!id) res.status(400).json({message: 'Cannot Found Id'});
  try {
    const Category = await CategoryServices.getCategoryById(id);
    const validation = CategoryZodSchema.safeParse(Category);
    if (!validation.success) res.status(400).json({message: 'Get Category By Id Failed', error: validation.error});
    res.status(200).json({message: 'Get Category By Id Successful', data: Category});
  } catch (error) {
    res.status(400).json({message: 'Get Category By Id Failed', error: ParseErrorMessage(error)});
  }
}
async function editCategory(req: Request, res: Response) {
  const {id} = req.params;
  const {title} = req.body;
  if (!id) res.status(400).json({message: 'Cannot Found Id'});
  if (!title) res.status(400).json({message: 'Category title Not Found'});
  try {
    const editedCategory = await CategoryServices.editCategory(id, title);
    const validation = CategoryZodSchema.safeParse(editedCategory);
    if (!validation.success) res.status(400).json({message: 'Category Edit Failed', error: validation.error});
    res.status(200).json({message: 'Category Edit Successful', data: editedCategory});
  } catch (error) {
    res.status(400).json({message: 'Category Edit Failed', error: ParseErrorMessage(error)});
  }
}
async function deleteCategory(req: Request, res: Response) {
  const {id} = req.params;
  if (!id) res.status(400).json({message: 'Cannot Found Id'});
  try {
    const deletedCategory = await CategoryServices.deleteCategory(id);
    res.status(200).json({message: 'Delete Category Successful', data: deletedCategory});
  } catch (error) {
    res.status(400).json({message: 'Delete Category Failed', error: ParseErrorMessage(error)});
  }
}
const CategoryController = {getCategories, createCategory, getCategoryById, editCategory, deleteCategory};
export default CategoryController;
