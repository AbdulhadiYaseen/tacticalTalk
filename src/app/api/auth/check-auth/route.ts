import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/app/lib/jwt';
import dbConnect from '@/app/lib/mongoose';
import User from '@/app/models/User';

export async function GET(request: NextRequest) {
    try {
        // Connect to database
        await dbConnect();
        
        const token = request.cookies.get('token')?.value;
        
        if (!token) {
            return NextResponse.json({ error: 'No token found' }, { status: 401 });
        }

        // Verify the token
        const decoded = await verifyToken(token);
        const userId = (decoded as any).id;
        
        // Fetch user information from database
        const user = await User.findById(userId).select('name email createdAt');
        
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 401 });
        }
        
        return NextResponse.json({ 
            message: 'Authenticated',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            }
        }, { status: 200 });
        
    } catch (error) {
        console.error('Auth check error:', error);
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
} 