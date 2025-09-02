import jwt from 'jsonwebtoken';
import express from 'express';
import {IUser} from '@/Models/v1/User.Model';
const app = express();
export const VerifyAdmin = app.use((req, res, next) => {
  try {
    const auth = (req.headers['Authorization'] || req.headers['authorization']) as string;
    const token = auth.split(' ')[1];
    const user = jwt.verify(token, process.env.SECRET_KEY!) as IUser;
    if (user.role === 'Admin') next();
    else res.status(401).json({message: 'U Not A Admin'});
  } catch (error) {
    res.status(401).json({message: 'Un Authorized'});
  }
});


