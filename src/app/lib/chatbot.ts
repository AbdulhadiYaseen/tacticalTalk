import Match from '../models/Match';
import { askGemini } from './gemini';
import { SYSTEM_PROMPT, PROMPT_TEMPLATES } from './prompts';


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
export async function handleUserMessage(message: string): Promise<string> {
  try {
    console.log('handleUserMessage called with:', message);
    
    if (!message || typeof message !== 'string' || !message.trim()) {
      throw new Error('Invalid message: message must be a non-empty string');
    }
    
    const prompt = buildPrompt(message.trim());
    console.log('Built prompt length:', prompt.length);

    
    const response = await askGemini(prompt);
    
    if (!response || typeof response !== 'string') {
      throw new Error('Invalid response from AI service');
    }
    
    console.log('handleUserMessage completed successfully');
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


