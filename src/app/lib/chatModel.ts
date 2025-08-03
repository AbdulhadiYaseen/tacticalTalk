import dbConnect from "./mongoose";
import { ChatHistory } from "@/app/models/ChatHistory";
import { IChatHistory, IChatMessage } from "@/types/chat";

// create a new chat session
export async function createChatSession(userId: string, sessionId: string, title: string): Promise<IChatHistory> {
    await dbConnect();
    const chatHistory = await ChatHistory.create({ userId, sessionId, title });
    return chatHistory.toObject();
}

// get all chat sessions for a user
export async function getChatSessions(userId: string): Promise<IChatHistory[]> {
    await dbConnect();
    const chatHistories = await ChatHistory.find({ userId }).sort({ createdAt: -1 });
    return chatHistories.map(session => session.toObject());
}

// get chat session by id
export async function getChatSessionById(sessionId: string): Promise<IChatHistory | null> {
    await dbConnect();
    const chatHistory = await ChatHistory.findById(sessionId);
    return chatHistory?.toObject() ?? null;
}

// add a message to a chat session
export async function addMessageToChat(sessionId: string, message: IChatMessage): Promise<IChatMessage | null> {
    await dbConnect();

    const chat = await ChatHistory.findOneAndUpdate(
        { sessionId },
        { $push: { messages: message } },
        { new: true, upsert: true }
    ).lean();

    if (!chat) return null;

    return message;

}


//get chat session titles
export async function getChatSessionsTitles(userId: string): Promise<{_id: string, title: string}[]> {
    await dbConnect();
    const chatTitles = await ChatHistory.find({ userId }).select('title _id').sort({ createdAt: -1 });
    return chatTitles.map(chat => ({ _id: chat._id.toString(), title: chat.title }));
}

export async function getChatSessionBySessionId(sessionId: string, userId: string) {
    await dbConnect();
    const chatHistory = await ChatHistory.findOne({ sessionId, userId });
    return chatHistory?.toObject() ?? null;
}


// Ensure text index exists on messages.content and title
ChatHistory.collection.createIndex(
    { "messages.content": "text", title: "text" }
);
export async function searchUserMessages(userId: string, searchTerm: string) {
    await dbConnect();
    return await ChatHistory.find({
        userId,
        $text: { $search: searchTerm }
    }).select('sessionId title messages');
}