// src/app/lib/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize with your API key from environment variable or fallback
const API_KEY = process.env.GOOGLE_AI_API_KEY || 'AIzaSyB8hHS59wmqvYjq4K4dFLIY7TZ0ucAi-mQ';
const genAI = new GoogleGenerativeAI(API_KEY);

// Get the Gemini 1.5 Flash model (faster and free)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function askGemini(prompt: string): Promise<string> {
  try {
    console.log('Sending prompt to Gemini:', prompt);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      console.error('No text received from Gemini response:', response);
      throw new Error('No response text from Gemini');
    }
    
    console.log('Received response from Gemini:', text.substring(0, 100) + '...');
    return text;
    
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('API_KEY_INVALID') || 
          error.message.includes('401') ||
          error.message.includes('403')) {
        throw new Error('Invalid API key. Please check your Google AI Studio API key.');
      } else if (error.message.includes('QUOTA_EXCEEDED')) {
        throw new Error('API quota exceeded. Please try again later.');
      } else if (error.message.includes('MODEL_NOT_FOUND')) {
        throw new Error('Gemini model not found. Please check your configuration.');
      }
    }
    
    throw new Error(`Failed to get response from AI: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export default model;
