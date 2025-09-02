import CustomerReviewsController from '@/Controllers/v1/CustomerController.Controller';
import { VerifyAdmin } from '@/Middleware/VerifyAdmin';
import {VerifyToken} from '@/Middleware/VerifyToken';
import {Router} from 'express';

const CustomerReviewRoute_v1 = Router();

CustomerReviewRoute_v1.get('/', CustomerReviewsController.getAllCustomerReview);
CustomerReviewRoute_v1.post('/create-customer-review', VerifyToken, VerifyAdmin, CustomerReviewsController.createCustomerReview);
CustomerReviewRoute_v1.get('/:id', CustomerReviewsController.getCustomerReviewById);
CustomerReviewRoute_v1.put('/:id', VerifyToken, VerifyAdmin, CustomerReviewsController.editCustomerReview);
CustomerReviewRoute_v1.delete('/:id', VerifyToken, VerifyAdmin, CustomerReviewsController.deleteCustomerReview);

export default CustomerReviewRoute_v1;
