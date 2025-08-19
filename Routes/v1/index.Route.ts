import {Router} from 'express';
import ProductRoute_v1 from '@/Routes/v1/Product.Route';
import CategoryRoute_v1 from './Category.Route';
import CustomerReviewRoute_v1 from './CustomerReview.Route';

const v1Route = Router();
v1Route.get('/', (_, res) => {
  res.status(200).json({message: 'Hello in NAHAM V1 Api'});
});
// product
// user
// sections
// CustomerReview

v1Route.use('/products', ProductRoute_v1);
v1Route.use('/categories', CategoryRoute_v1);
v1Route.use('/customer-review', CustomerReviewRoute_v1);

export default v1Route;
