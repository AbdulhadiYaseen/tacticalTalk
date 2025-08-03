import mongoose, { Schema, models, model } from "mongoose";
import dbConnect from "./mongoose";
import { IUser } from "../../types/user";
import UserSchema from "@/app/models/User";

// Prevent model overwrite upon hot-reload in dev
const User = models.User || model<IUser>("User", UserSchema);

export async function findUserByEmail(email: string): Promise<IUser | null> {
  await dbConnect();
  const user = await User.findOne({ email }).lean<IUser>();
  return user ?? null;
}

export async function createUser(user: IUser): Promise<IUser> {
  await dbConnect();
  const created = await User.create(user);
  return created.toObject();
}

export async function findUserById(id: string): Promise<IUser | null> {
  await dbConnect();
  const user = await User.findById(id).lean<IUser>();
  return user ?? null;
}