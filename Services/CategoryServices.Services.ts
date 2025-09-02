import {CategoryModel} from '@/Models/v1/Category.Model';

async function getCategories() {
  try {
    const Categories = await CategoryModel.findMany();
    return Categories;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}
async function createCategory(title: string) {
  try {
    const newCategory = await CategoryModel.create({data: {title}});
    return newCategory;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}
async function getCategoryById(id: string) {
  try {
    const Category = await CategoryModel.findUnique({where: {id}, include: {Products: true}});
    return Category;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}
async function editCategory(id: string, title: string) {
  try {
    const editedCategory = await CategoryModel.update({where: {id}, data: {title}});
    return editedCategory;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}
async function deleteCategory(id: string) {
  try {
    const deletedCategory = await CategoryModel.delete({where: {id}});
    return deletedCategory;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

const CategoryServices = {
  getCategories,
  createCategory,
  getCategoryById,
  editCategory,
  deleteCategory
};
export default CategoryServices;
