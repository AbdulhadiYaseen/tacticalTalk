import OpenAI from 'openai';


const API_KEY = process.env.OPEN_AI_API_KEY || 'sk-proj-1234567890';
const openai = new OpenAI({
  apiKey: API_KEY,
});




export async function askOpenAI(prompt: string): Promise<string> {
  try {
    console.log('Sending prompt to OPENAI:', prompt);
    
    const result = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o-mini",
      store: true,
    });
    const response = result.choices[0].message.content;
    
    if (!response) {
      console.error('No text received from OPENAI response:', response);
      throw new Error('No response text from OPENAI');
    }
    
    console.log('Received response from OPENAI:', response.substring(0, 100) + '...');
    return response;
    
  } catch (error) {
    console.error('Error calling OPENAI API:', error);
    
  
    if (error instanceof Error) {
      if (error.message.includes('API_KEY_INVALID') || 
          error.message.includes('401') ||
          error.message.includes('403')) {
        throw new Error('Invalid API key. Please check your OPENAI API key.');
      } else if (error.message.includes('QUOTA_EXCEEDED')) {
        throw new Error('API quota exceeded. Please try again later.');
      } else if (error.message.includes('MODEL_NOT_FOUND')) {
        throw new Error('OPENAI model not found. Please check your configuration.');
      }
    }
    
    throw new Error(`Failed to get response from AI: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
