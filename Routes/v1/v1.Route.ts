import {Router} from 'express';
import ProductRoute_v1 from '@/Routes/v1/Product.Route';

const v1Route = Router();
v1Route.get('/', (req, res) => {
  res.status(200).json({message: 'Hello in NAHAM V1 Api'});
});
v1Route.use('/products', ProductRoute_v1);

export default v1Route;
