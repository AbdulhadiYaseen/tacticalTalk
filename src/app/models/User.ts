import mongoose, { Schema, Document, models, model } from 'mongoose';
import { IUser } from '@/types/user';

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
})


const User = models.User || model<IUser>('User', UserSchema);
export default User;