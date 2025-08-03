export type MessageRole = 'user' | 'bot';

export interface IChatMessage {
    id: string;               // Unique ID for each message (UUID or timestamp-based)
    role: MessageRole;        // 'user' or 'bot'
    content: string;          // The actual message text
    timestamp: string;        // ISO format date-time string
}

//  frontend sends a message
export interface IChatRequest {
    messages: IChatMessage[];  // All previous messages, including current user input
}

// backend sends the bot's reply
export interface IChatResponse {
    reply: IChatMessage;       
  }

export interface IChatHistory {
    userId: string;
    sessionId: string;
    messages: IChatMessage[];
    title: string;
    createdAt: Date;
    updatedAt: Date;
}
  

