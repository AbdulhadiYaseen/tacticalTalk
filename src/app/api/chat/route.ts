import { NextRequest, NextResponse } from 'next/server';
import { handleUserMessage } from '../../lib/chatbot';
import { IChatRequest, IChatResponse, MessageRole } from '@/types/chat';
import { getChatSessionsTitles } from '@/app/lib/chatModel';

export async function POST(request: NextRequest) {
    try {
        console.log('API route called');
        
        
        const body = await request.json();
        console.log('Request body:', body);
        
        if (!body.messages || !Array.isArray(body.messages)) {
            console.error('Invalid request: messages array missing or invalid');
            return NextResponse.json(
                { error: 'Invalid request: messages array required' },
                { status: 400 }
            );
        }
        
        const { messages } = body as IChatRequest;
        
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
        
        
        const response = await handleUserMessage(lastMessage.content);
        console.log('Bot response received:', response.substring(0, 100) + '...');
        
        // Create the bot response with all required fields
        const botMessage = {
            id: crypto.randomUUID(),           
            role: 'bot' as MessageRole,        
            content: response,                 
            timestamp: new Date().toISOString()
        };
        
        const chatResponse: IChatResponse = { reply: botMessage };
        console.log('Sending response back to client');
        
        return NextResponse.json(chatResponse, { status: 200 });
        
    } catch (error) {
        console.error('Error in chat API:', error);
        
        
        if (error instanceof Error) {
            
            if (error.message.includes('Authentication failed') || 
                error.message.includes('PERMISSION_DENIED')) {
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