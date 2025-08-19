import {CustomerReviewZodSchema, ICustomerReview} from '@/Models/v1/CustomerReview.Model';
import CustomerReviewsServices from '@/Services/CustomerReviewServices.Services';
import ParseErrorMessage from '@/Utils/ParseErrorMessage';
import {Request, Response} from 'express';

async function getAllCustomerReview(req: Request, res: Response) {
  try {
    const CustomerReviews = await CustomerReviewsServices.getAllCustomerReviews();
    res.status(200).json({message: 'Get All CustomerReviews Successful', data: CustomerReviews});
  } catch (error) {
    res.status(400).json({message: 'Get All CustomerReviews Failed', error: ParseErrorMessage(error)});
  }
}
async function getCustomerReviewById(req: Request, res: Response) {
  const {id} = req.params;
  if (!id) res.status(400).json({message: 'Id Not Found'});
  try {
    const CustomerReview = await CustomerReviewsServices.getCustomerReviewById(id);
    res.status(200).json({message: 'Get CustomerReviews By ID Successful', data: CustomerReview});
  } catch (error) {
    res.status(400).json({message: 'Get CustomerReviews By ID Failed', error: ParseErrorMessage(error)});
  }
}

async function createCustomerReview(req: Request, res: Response) {
  const CustomerReview = req.body;
  const validation = CustomerReviewZodSchema.safeParse(CustomerReview);
  if (!validation.success) res.status(400).json({message: 'Create CustomerReviews Failed', error: validation.error});
  try {
    const newCustomerReview = await CustomerReviewsServices.createCustomerReview(CustomerReview);
    res.status(200).json({message: 'Create CustomerReviews Successful', data: newCustomerReview});
  } catch (error) {
    res.status(400).json({message: 'Create CustomerReviews Failed', error: ParseErrorMessage(error)});
  }
}

async function editCustomerReview(req: Request, res: Response) {
  const {id} = req.params;
  if (!id) res.status(400).json({message: 'Id Not Found'});
  const CustomerReview: ICustomerReview = req.body;

  if (!CustomerReview.authorName && !CustomerReview.numberOfStar && !CustomerReview.text) res.status(400).json({message: 'Edit CustomerReviews Data Invalid'});
  try {
    const editedCustomerReview = await CustomerReviewsServices.editCustomerReview(id, CustomerReview);
    res.status(200).json({message: 'Edit CustomerReviews Successful', data: editedCustomerReview});
  } catch (error) {
    res.status(400).json({message: 'Edit CustomerReviews Failed', error: ParseErrorMessage(error)});
  }
}
async function deleteCustomerReview(req: Request, res: Response) {
  const {id} = req.params;
  if (!id) res.status(400).json({message: 'Id Not Found'});
  try {
    const deletedCustomerReview = await CustomerReviewsServices.deleteCustomerReview(id);
    res.status(200).json({message: 'Delete CustomerReviews Successful', data: deletedCustomerReview});
  } catch (error) {
    res.status(400).json({message: 'Delete CustomerReviews Failed', error: ParseErrorMessage(error)});
  }
}

const CustomerReviewsController = {
  getAllCustomerReview,
  getCustomerReviewById,
  createCustomerReview,
  editCustomerReview,
  deleteCustomerReview
};
export default CustomerReviewsController;
