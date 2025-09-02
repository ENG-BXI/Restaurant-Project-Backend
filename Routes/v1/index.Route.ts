import {Router} from 'express';
import ProductRoute_v1 from '@/Routes/v1/Product.Route';
import CategoryRoute_v1 from './Category.Route';
import CustomerReviewRoute_v1 from './CustomerReview.Route';
import SectionRoute_v1 from './Section.Route';
import UserRoute_v1 from './User.Route';
import AuthRoute_v1 from './Auth.Route';
import {VerifyToken} from '@/Middleware/VerifyToken';
const v1Route = Router();
v1Route.get('/', (_, res) => {
  res.status(200).json({message: 'Hello in NAHAM V1 Api'});
});

v1Route.use('/auth', AuthRoute_v1);
v1Route.use('/users', VerifyToken, UserRoute_v1);
v1Route.use('/products', ProductRoute_v1);
v1Route.use('/categories', CategoryRoute_v1);
v1Route.use('/customer-review', CustomerReviewRoute_v1);
v1Route.use('/sections', SectionRoute_v1);

export default v1Route;

// add image to all api want image
//    section api
//    product api
// add token and currentUser api ✅
// in front complete a dashboard
// add login , register page
