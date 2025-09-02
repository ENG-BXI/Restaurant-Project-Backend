import AuthController from '@/Controllers/v1/Auth.Controller';
import {Router} from 'express';
const AuthRoute_v1 = Router();

AuthRoute_v1.post('/register', AuthController.register);
AuthRoute_v1.post('/login', AuthController.login);

export default AuthRoute_v1;
