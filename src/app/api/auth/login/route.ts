import { NextRequest, NextResponse } from 'next/server';
import User from '@/app/models/User';
import { IUser } from '@/types/user';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/app/lib/jwt';
import dbConnect from '@/app/lib/mongoose';

export async function POST(request: NextRequest) {
    try {
        // Connect to database
        await dbConnect();
        const { email, password } = await request.json();

        // Validate required fields
        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        const token = generateToken(user._id);
        
        // Create response
        const response = NextResponse.json({ 
            message: 'Login successful',
            user: { email: user.email, _id: user._id }
        }, { status: 200 });
        
        // Set HTTP-only cookie
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/'
        });
        
        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ 
            error: 'Internal server error. Please try again.' 
        }, { status: 500 });
    }
}