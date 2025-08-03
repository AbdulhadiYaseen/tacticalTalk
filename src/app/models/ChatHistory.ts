import mongoose, { Schema, models, model } from "mongoose";
import { IChatMessage, IChatHistory } from "@/types/chat";

const MessageSchema = new Schema<IChatMessage>({
  id: { type: String, required: true },
  role: { type: String, enum: ['user', 'bot'], required: true },
  content: { type: String, required: true },
  timestamp: { type: String, required: true },
});



const ChatHistorySchema = new Schema<IChatHistory>(
  {
    userId: {
      type: String,
      required: true,
      ref: 'User',
    },
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    messages: [MessageSchema],
    title: {
      type: String,
      default: "New Chat",
    },
  },
  {
    timestamps: true, 
  }
);

// Index for faster queries
ChatHistorySchema.index({ userId: 1, createdAt: -1 });

const ChatHistory = models.ChatHistory || model<IChatHistory>("ChatHistory", ChatHistorySchema);

const ChatMessage = models.ChatMessage || model<IChatMessage>("ChatMessage", MessageSchema);

export { ChatHistory, ChatMessage };