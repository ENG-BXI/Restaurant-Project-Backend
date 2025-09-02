import {IUser, User} from '@/Models/v1/User.Model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
async function register(email: string, password: string) {
  try {
    // hash password
    const hashedPassword = await bcrypt.hash(password.toString(), 10);
    const newUser = await User.create({data: {email, password: hashedPassword}});
    // Generate Token
    const token = jwt.sign({id: newUser.id, email: newUser.id, role: newUser.role}, process.env.SECRET_KEY!, {expiresIn: '3d'});
    return {
      id: newUser.id,
      email: newUser.email,
      token
    };
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

async function login(email: string, password: string) {
  try {
    // check user exist
    const user = await User.findUnique({where: {email}});
    if (!user) throw new Error('Email Or Password Not Correct');


    // check password
    const checkedPassword = await bcrypt.compare(password.toString(), user.password);
    if (!checkedPassword) throw new Error(JSON.stringify('Email Or Password Not Correct'));
    // generate Token
    const token = jwt.sign({id: user.id, email: user.email, role: user.role}, process.env.SECRET_KEY!);

    return {
      id: user.id,
      email: user.email,
      token
    };
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

const AuthServices = {register, login};

export default AuthServices;
