import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { verifyToken } from "@/app/lib/jwt";

export async function GET(request: NextRequest){
    try{
        const token = request.cookies.get('token')?.value;

        if(!token){
            return NextResponse.json({error: 'No token found'}, {status:404})
        }

        const decoded = await verifyToken(token);
        return NextResponse.json({
            message: 'Authenticated',
            userId: (decoded as any).id
        }, {status: 200})
    }
    catch(error){
        console.error('Error verifying token:', error);
        return NextResponse.json({error: 'Invalid token'}, {status: 401})
    }
}

