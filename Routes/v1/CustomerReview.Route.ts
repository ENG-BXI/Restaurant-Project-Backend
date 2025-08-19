import CustomerReviewsController from '@/Controllers/v1/CustomerController.Controller';
import {Router} from 'express';

const CustomerReviewRoute_v1 = Router();

CustomerReviewRoute_v1.get('/', CustomerReviewsController.getAllCustomerReview);
CustomerReviewRoute_v1.post('/create-customer-review', CustomerReviewsController.createCustomerReview);
CustomerReviewRoute_v1.get('/:id', CustomerReviewsController.getCustomerReviewById);
CustomerReviewRoute_v1.put('/:id', CustomerReviewsController.editCustomerReview);
CustomerReviewRoute_v1.delete('/:id', CustomerReviewsController.deleteCustomerReview);

export default CustomerReviewRoute_v1;
