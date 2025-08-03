import { NextRequest, NextResponse } from 'next/server';
import User from '@/app/models/User';
import { IUser } from '@/types/user';
import bcrypt from 'bcryptjs';
import dbConnect from '@/app/lib/mongoose';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const { name, email, password } = await request.json();

        
        if (!name || !email || !password) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser: IUser = {
            name,
            email,
            password: hashedPassword,
        }

        const createdUser = await User.create(newUser);
        
        return NextResponse.json({ 
            message: 'Account created successfully! Please login to continue.',
            user: { email: createdUser.email, _id: createdUser._id }
        }, { status: 201 });
    } 
    catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json({ 
            error: 'Internal server error. Please try again.' 
        }, { status: 500 });
    }
}