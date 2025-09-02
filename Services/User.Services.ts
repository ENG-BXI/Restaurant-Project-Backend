import {User} from '@/Models/v1/User.Model';

async function getAllUsers() {
  try {
    const users = await User.findMany();
    return users;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

async function getCurrentUser(id: string) {
  try {
    const user = await User.findUnique({where: {id}, omit: {password: true}});
    return user;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

const userServices = {
  getAllUsers,
  getCurrentUser
};

export default userServices;
