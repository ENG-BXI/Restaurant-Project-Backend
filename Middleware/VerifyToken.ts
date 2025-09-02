import express from 'express';

import jwt from 'jsonwebtoken';
const app = express();
export const VerifyToken = app.use((req, res, next) => {
  try {
    const auth = (req.headers['Authorization'] || req.headers['authorization']) as string;
    const token = auth.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY!);
    next();
  } catch (error) {
    res.status(401).json({message: 'Un Authorized'});
  }
});
