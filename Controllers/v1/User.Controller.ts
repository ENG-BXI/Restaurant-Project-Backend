import {IUser} from '@/Models/v1/User.Model';
import userServices from '@/Services/User.Services';
import ParseErrorMessage from '@/Utils/ParseErrorMessage';
import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await userServices.getAllUsers();
    res.status(200).json({message: 'Get All Users Successful', data: users});
  } catch (error) {
    res.status(400).json({message: 'Get All Users Failed', error: ParseErrorMessage(error)});
  }
}

async function currentUser(req: Request, res: Response) {
  try {
    const header = (req.headers['Authorization'] || req.headers['authorization']) as string;
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as IUser;
    const user = await userServices.getCurrentUser(decoded.id!);
    res.status(200).json({message: 'Get user data successful', data: user});
  } catch (error) {
    res.status(400).json({message: 'Get user data failed', error: ParseErrorMessage(error)});
  }
}

const userController = {
  getAllUsers,
  currentUser
};

export default userController;
