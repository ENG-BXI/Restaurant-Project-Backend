import userController from '@/Controllers/v1/User.Controller';
import {VerifyAdmin} from '@/Middleware/VerifyAdmin';
import {Router} from 'express';
const UserRoute = Router();

UserRoute.get('/', VerifyAdmin, userController.getAllUsers);
UserRoute.get('/current-user', userController.currentUser);

export default UserRoute;
