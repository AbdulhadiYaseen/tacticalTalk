import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongoose';

export async function GET(request: NextRequest) {
    try {
        console.log('Testing configuration...');
        
        // Check environment variables
        const openAIKey = process.env.OPEN_AI_API_KEY;
        const mongoURI = process.env.MONGODB_URI;
        
        const config = {
            openAI: {
                configured: !!openAIKey,
                isDefault: openAIKey === 'sk-proj-1234567890',
                length: openAIKey ? openAIKey.length : 0
            },
            mongodb: {
                configured: !!mongoURI,
                length: mongoURI ? mongoURI.length : 0
            },
            database: {
                connected: false,
                error: null as string | null
            }
        };
        
        // Test database connection
        try {
            await dbConnect();
            config.database.connected = true;
            console.log('Database connection test: SUCCESS');
        } catch (error) {
            config.database.error = error instanceof Error ? error.message : 'Unknown error';
            console.log('Database connection test: FAILED', error);
        }
        
        return NextResponse.json(config, { status: 200 });
        
    } catch (error) {
        console.error('Error in test-config:', error);
        return NextResponse.json(
            { error: 'Configuration test failed', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
} 