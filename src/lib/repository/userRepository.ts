// lib/repository/userRepository.ts
import dbConnect from '../mongo/db';
import User, { IUser } from '../../models/User';

export async function createUser(data: IUser): Promise<IUser> {
  await dbConnect();
  return User.create(data);
}

export async function getUsers(): Promise<IUser[]> {
  await dbConnect();
  return User.find({});
}

export async function getUserById(id: string): Promise<IUser | null> {
  await dbConnect();
  return User.findById(id);
}

export async function updateUser(id: string, data: Partial<IUser>): Promise<IUser | null> {
  await dbConnect();
  return User.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteUser(id: string): Promise<IUser | null> {
  await dbConnect();
  return User.findByIdAndDelete(id);
}
