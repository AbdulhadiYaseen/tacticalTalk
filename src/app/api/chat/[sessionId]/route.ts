import { NextRequest, NextResponse } from 'next/server';
import { getChatSessionById } from '@/app/lib/chatModel';


//Get chat sessions by session id
export async function GET(request: NextRequest, {params}: {params: {sessionId: string}}) {
    try{
        const sessionId = params.sessionId;
        if(!sessionId){
            return NextResponse.json({error:'Session ID is required'},{status:400});
        }

        const chatSession = await getChatSessionById(sessionId);
        if(!chatSession){
            return NextResponse.json({error:'Chat session not found'},{status:404});
        }

        return NextResponse.json(chatSession,{status:200});
    }
    catch(error){
        console.error('Error in getChatSessionById:', error);
        return NextResponse.json({error:'Internal server error'},{status:500});
    }
}