import { ChatMessage } from '../models/ChatHistory';
import { askOpenAI } from './openAI';
import { SYSTEM_PROMPT, PROMPT_TEMPLATES } from './prompts';
import { IChatMessage, UUID } from '@/types/chat';
import dbConnect from './mongoose';
import { addMessageToChat, createChatSession } from './chatModel';

function buildPrompt(message: string): string {
  console.log('Building prompt for message:', message);
  
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('formation')) {
    console.log('Using formation template');
    return `${SYSTEM_PROMPT}\n\n${PROMPT_TEMPLATES.explainFormation(message)}`;
  }
  if (lowerMessage.includes('tactic')) {
    console.log('Using tactic template');
    return `${SYSTEM_PROMPT}\n\n${PROMPT_TEMPLATES.explainTactic(message)}`;
  }
  if (lowerMessage.includes('pressing')) {
    console.log('Using pressing template');
    return `${SYSTEM_PROMPT}\n\n${PROMPT_TEMPLATES.explainPressing(message)}`;
  }
  if (lowerMessage.includes('build-up')) {
    console.log('Using buildup template');
    return `${SYSTEM_PROMPT}\n\n${PROMPT_TEMPLATES.explainBuildup(message)}`;
  }
  
  
  console.log('Using default template');
  return `${SYSTEM_PROMPT}\n\nUser: ${message}`;
}

//handle user msg, return bot reply
export async function handleUserMessage(
  message: string, 
  userId: string, 
  sessionId: string,
  isNewSession: boolean = false
): Promise<string> {
  try {
    
    if (!message || typeof message !== 'string' || !message.trim()) {
      throw new Error('Invalid message: message must be a non-empty string');
    }
    if (!userId || !sessionId) {
      throw new Error('User ID and Session ID are required');
    }
    if (!process.env.OPEN_AI_API_KEY || process.env.OPEN_AI_API_KEY === 'sk-proj-1234567890') {
      throw new Error('OpenAI API key is not configured. Please set OPEN_AI_API_KEY in your environment variables.');
    }

  
    let databaseAvailable = true;
    try {
      await dbConnect();
      console.log('Database connection successful');
    } catch (dbError) {
      console.warn('Database connection failed, proceeding without saving:', dbError);
      databaseAvailable = false;
    }

    if (isNewSession && databaseAvailable) {
      const chatTitle = message.substring(0, 50) + (message.length > 50 ? '...' : '');
      await createChatSession(userId, sessionId, chatTitle);
    }
    
    // Save user msg
    if (databaseAvailable) {
      const userMessage: IChatMessage = {
        id: crypto.randomUUID() as UUID,
        role: 'user',
        content: message,
        timestamp: new Date().toISOString(),
      };
      
      await addMessageToChat(sessionId, userMessage);
    }
    
    const response = await askOpenAI(buildPrompt(message.trim()));
    
    // Save bot msg 
    if (databaseAvailable) {
      const botMessage: IChatMessage = {
        id: crypto.randomUUID() as UUID,
        role: 'bot',
        content: response,
        timestamp: new Date().toISOString(),
      };
      
      await addMessageToChat(sessionId, botMessage);
    }
    
    return response;
  } catch (error) {
    console.error('Error in handleUserMessage:', error);
    
    
    if (error instanceof Error) {
      throw new Error(`Chat handler error: ${error.message}`);
    } else {
      throw new Error('Unknown error in chat handler');
    }
  }
}



