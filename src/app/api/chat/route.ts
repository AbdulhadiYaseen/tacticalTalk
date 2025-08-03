import { NextRequest, NextResponse } from 'next/server';
import { handleUserMessage } from '../../lib/chatbot';
import { IChatRequest, IChatResponse, MessageRole, UUID } from '@/types/chat';
import { getChatSessionsTitles } from '@/app/lib/chatModel';
import dbConnect from '@/app/lib/mongoose';

export async function POST(request: NextRequest) {
    try {
        console.log('API route called');
        
        
        if (!process.env.OPEN_AI_API_KEY || process.env.OPEN_AI_API_KEY === 'sk-proj-1234567890') {
            console.error('Invalid or missing OPEN_AI_API_KEY');
            return NextResponse.json(
                { error: 'AI service configuration error. Please contact support.' },
                { status: 503 }
            );
        }

        if (!process.env.MONGODB_URI) {
            console.error('Missing MONGODB_URI');
            return NextResponse.json(
                { error: 'Database configuration error. Please contact support.' },
                { status: 503 }
            );
        }

        
        try {
            await dbConnect();
            console.log('Database connection successful');
        } catch (dbError) {
            console.error('Database connection failed:', dbError);
            return NextResponse.json(
                { error: 'Database connection error. Please try again later.' },
                { status: 503 }
            );
        }
        
        
        const body = await request.json();
        console.log('Request body:', JSON.stringify(body, null, 2));
        
        if (!body.messages || !Array.isArray(body.messages)) {
            console.error('Invalid request: messages array missing or invalid');
            return NextResponse.json(
                { error: 'Invalid request: messages array required' },
                { status: 400 }
            );
        }
        
        const { messages, userId, sessionId, isNewSession } = body as IChatRequest & {
            userId: string;
            sessionId: string;
            isNewSession?: boolean;
        };

        if (!userId || !sessionId) {
            return NextResponse.json(
                { error: 'Invalid request: userId and sessionId are required' },
                { status: 400 }
            );
        }
        
        if (messages.length === 0) {
            console.error('Invalid request: messages array is empty');
            return NextResponse.json(
                { error: 'Invalid request: messages array cannot be empty' },
                { status: 400 }
            );
        }
        
        const lastMessage = messages[messages.length - 1];
        if (!lastMessage.content || !lastMessage.content.trim()) {
            console.error('Invalid request: last message content is empty');
            return NextResponse.json(
                { error: 'Invalid request: message content cannot be empty' },
                { status: 400 }
            );
        }
        
        console.log('Processing message:', lastMessage.content);
        
        // Call handleUserMessage
        const response = await handleUserMessage(
            lastMessage.content, 
            userId, 
            sessionId,
            isNewSession
        );
        
        console.log('Bot response received:', response.substring(0, 100) + '...');
        
        // Create the bot response
        const botMessage = {
            id: crypto.randomUUID() as UUID,           
            role: 'bot' as MessageRole,        
            content: response,                 
            timestamp: new Date().toISOString()
        };
        
        const chatResponse: IChatResponse = { reply: botMessage };
        console.log('Sending response back to client');
        
        return NextResponse.json(chatResponse, { status: 200 });
        
    } catch (error) {
        console.error('Error in chat API:', error);
        
        // Log the full error for debugging
        if (error instanceof Error) {
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
        }
        
        if (error instanceof Error) {
            
            if (error.message.includes('Authentication failed') || 
                error.message.includes('PERMISSION_DENIED') ||
                error.message.includes('Invalid API key')) {
                return NextResponse.json(
                    { error: 'AI service authentication error. Please contact support.' },
                    { status: 503 }
                );
            }
            
            
            if (error.message.includes('QUOTA_EXCEEDED') ||
                error.message.includes('quota exceeded')) {
                return NextResponse.json(
                    { error: 'AI service temporarily unavailable. Please try again later.' },
                    { status: 503 }
                );
            }
            
            
            if (error.message.includes('timeout') || 
                error.message.includes('ECONNRESET') ||
                error.message.includes('ENOTFOUND')) {
                return NextResponse.json(
                    { error: 'Network error. Please check your connection and try again.' },
                    { status: 502 }
                );
            }

            // MongoDB specific errors
            if (error.message.includes('MongoNetworkError') ||
                error.message.includes('MongoServerSelectionError')) {
                return NextResponse.json(
                    { error: 'Database connection error. Please try again later.' },
                    { status: 503 }
                );
            }
        }
        
        // Generic server error
        return NextResponse.json(
            { error: 'Internal server error. Please try again later.' },
            { status: 500 }
        );
    }
} 

//get titles for all chat sessions for this user
export async function GET(request: NextRequest) {
    try{
        const userId = request.nextUrl.searchParams.get('userId');

        if(!userId){
            return NextResponse.json({error:'User ID is required'},{status:400});
        }

        const chatTitles = await getChatSessionsTitles(userId);
        return NextResponse.json(chatTitles,{status:200});
    }
    catch(error){
        console.error('Error in getChatHistory:', error);
        return NextResponse.json({error:'Internal server error'},{status:500});
    }
}