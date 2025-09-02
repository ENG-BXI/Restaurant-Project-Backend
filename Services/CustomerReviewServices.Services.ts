import {CustomerReviewModel, CustomerReviewZodSchema, ICustomerReview} from '@/Models/v1/CustomerReview.Model';


async function getAllCustomerReviews() {
  try {
    const CustomerReviews = await CustomerReviewModel.findMany();
    return CustomerReviews;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}
async function getCustomerReviewById(id: string) {
  try {
    const CustomerReview = await CustomerReviewModel.findUnique({where: {id}});
    return CustomerReview;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}
async function createCustomerReview(CustomerReview: ICustomerReview) {
  try {
    const newCustomerReview = await CustomerReviewModel.create({data: CustomerReview});
    return newCustomerReview;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}
async function editCustomerReview(id: string, CustomerReview: ICustomerReview) {
  try {
    const editedCustomerReview = await CustomerReviewModel.update({where: {id}, data: CustomerReview});
    return editedCustomerReview;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}
async function deleteCustomerReview(id: string) {
  try {
    const deletedCustomerReview = await CustomerReviewModel.delete({where: {id}});
    return deletedCustomerReview;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

const CustomerReviewsServices = {
  getAllCustomerReviews,
  getCustomerReviewById,
  createCustomerReview,
  editCustomerReview,
  deleteCustomerReview
};

export default CustomerReviewsServices;
