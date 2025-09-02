import {IUser} from '@/Models/v1/User.Model';
import AuthServices from '@/Services/Auth.Services';
import ParseErrorMessage from '@/Utils/ParseErrorMessage';
import {Request, Response} from 'express';

async function register(req: Request, res: Response) {
  const {email, password} = req.body;
  try {
    if (!email || !password) res.status(400).json({message: 'Email and Password is Require'});
    if (password.toString().trim().length < 8) res.status(400).json({message: 'Password is Less Than 8 Character'});
    const newUser = await AuthServices.register(email, password);

    res.status(200).json({message: 'Register Successful', data: newUser});
  } catch (error) {
    res.status(400).json({message: 'Register Failed', error: ParseErrorMessage(error)});
  }
}
async function login(req: Request, res: Response) {
  const {email, password} = req.body;
  try {
    if (!email || !password) res.status(400).json({message: 'Email and Password is Require'});
    const newUser = await AuthServices.login(email, password);
    res.status(200).json({message: 'Login Successful', data: newUser});
  } catch (error) {
    res.status(400).json({message: 'Login Failed', error: ParseErrorMessage(error)});
  }
}

const AuthController = {
  register,
  login
};

export default AuthController;
