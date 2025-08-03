"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/auth";
import { IChatMessage, IChatRequest, IChatResponse } from "../../types/chat";
import ReactMarkdown from 'react-markdown';

interface ChatSummary {
  _id: string;
  title: string;
}

export default function ChatWithBotPage() {
  const [messages, setMessages] = useState([
    {
      id: "initial-message",
      content: "⚽ Hello! I'm your AI Football Tactics Coach. Ask me anything about formations, strategies, or tactical analysis!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [showQuickQuestions, setShowQuickQuestions] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [recentChats, setRecentChats] = useState<ChatSummary[]>([]);
  const [chatsLoading, setChatsLoading] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ChatSummary[]>([]);
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const { isAuthenticated, isLoading: authLoading, user, redirectToLogin } = useAuth();
  const router = useRouter();

  // Search through chats
  const searchChats = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    const filtered = recentChats.filter(chat => 
      chat.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchChats(query);
  };

  // Handle search input key events
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsSearchMode(false);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  // Toggle search mode
  const toggleSearchMode = () => {
    if (sidebarCollapsed) return; // Don't allow search mode when collapsed
    
    setIsSearchMode(!isSearchMode);
    if (!isSearchMode) {
      // Entering search mode - clear previous search
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  // Handle chat selection (exit search mode)
  const handleChatSelect = () => {
    if (isSearchMode) {
      setIsSearchMode(false);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  // Fetch recent chats for the user
  const fetchRecentChats = async () => {
    if (!user?.id) return;
    
    setChatsLoading(true);
    try {
      const response = await fetch(`/api/chat?userId=${user.id}`);
      if (response.ok) {
        const chats = await response.json();
        setRecentChats(chats);
      } else {
        console.error('Failed to fetch recent chats');
      }
    } catch (error) {
      console.error('Error fetching recent chats:', error);
    } finally {
      setChatsLoading(false);
    }
  };

  // Check authentication on component mount
  useEffect(() => {
    if(!isAuthenticated && !authLoading){
      redirectToLogin();
    }
  }, [isAuthenticated, authLoading, redirectToLogin]);

  // Fetch recent chats when user is available
  useEffect(() => {
    if (user?.id) {
      fetchRecentChats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Exit search mode when sidebar is collapsed
  useEffect(() => {
    if (sidebarCollapsed && isSearchMode) {
      setIsSearchMode(false);
      setSearchQuery("");
      setSearchResults([]);
    }
  }, [sidebarCollapsed, isSearchMode]);
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }


  if (!isAuthenticated) {
    return null;
  }
  const quickQuestions = [
    "How to beat a high press?",
    "Best formation against 3-5-2?",
    "Explain tiki-taka tactics",
    "Counter-attacking strategies",
    "How to defend against tiki-taka?",
    "How to break down a low block?",
    "How to exploit wide areas effectively?",
    "What are the best pressing traps?",
    "How to set up a mid-block?",
    "How to play a false 9 effectively?",
    "What's the role of inverted fullbacks?",
    "How to use overlapping center backs?",
    "How to defend with a back 3?",
    "When to use man-marking vs zonal marking?",
    "How to transition quickly from defense to attack?",
    "How to press in a 4-3-3?",
    "How to counter a 4-2-3-1 formation?",
    "How to beat teams that park the bus?",
    "What's the advantage of gegenpressing?",
    "How to press without getting exposed?",
    "How to dominate possession?",
    "How to play out from the back under pressure?",
    "How to maintain a high line safely?",
    "Best ways to stop counter-attacks?",
    "Strengths of 4-4-2 diamond?",
    "How to utilize a 3-4-3 formation?",
    "How to play with a 4-2-2-2 shape?",
    "When to switch to 5 at the back?",
    "3-5-2 vs 4-3-3 — who wins and why?",
    "Advantages of 4-1-4-1?",
    "Best formation for quick wingers?",
    "How to control midfield in a 4-3-3?",
    "4-2-3-1 vs 4-4-2 — tactical breakdown?",
    "How to beat a 4-1-4-1 formation?",
    "How to organize a defensive wall?",
    "Best corner routines for tall teams?",
    "Throw-in strategies near the box?",
    "Free kick ideas for left-footed takers?",
    "How to manage a lead in final 10 minutes?",
    "Tactical fouls — when and how?",
    "How to defend set pieces zonally?",
    "How to use short corners effectively?",
    "Best role for a deep-lying playmaker?",
    "What does a mezzala do?",
    "Difference between box-to-box and ball-winning midfielder?",
    "How to use a target man properly?",
    "Inverted winger vs traditional winger?",
    "How to coach a sweeper keeper?",
    "How to play with 10 men?",
    "What to change when trailing by 2 goals?",
    "How to start a game strongly?",
    "What to tweak at half-time if 0-0?",
    "How to hold onto a 1-0 lead?",
    "Best last-minute attacking tactics?",
    "How to kill momentum of the opponent?"
  ];
  

  const sendMessage = async (message: string) => {
    if (!message.trim() || isLoadingResponse) return;

    // Add user message
    const userMessage = {
      id: crypto.randomUUID(),
      content: message,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setShowQuickQuestions(false);
    setIsLoadingResponse(true);

    try {
      // Convert messages to API format
      const allMessages = [...messages, userMessage];
      const apiMessages: IChatMessage[] = allMessages.map(msg => ({
        id: typeof msg.id === 'string' ? msg.id : String(msg.id),
        role: msg.isBot ? 'bot' : 'user',
        content: msg.content,
        timestamp: msg.timestamp instanceof Date ? msg.timestamp.toISOString() : String(msg.timestamp)
      }));

      // Make API call
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: apiMessages } as IChatRequest),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: IChatResponse = await response.json();
      
      // Add bot response to messages
      const botResponse = {
        id: data.reply.id,
        content: data.reply.content,
        isBot: true,
        timestamp: new Date(data.reply.timestamp)
      };
      setMessages(prev => [...prev, botResponse]);

    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage = {
        id: crypto.randomUUID(),
        content: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoadingResponse(false);
    }
  };


    return (
    <div className="h-screen flex bg-primary relative">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 bg-gray-800 transform transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarCollapsed ? 'lg:w-16' : 'lg:w-64'
      } ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && <h2 className="text-white font-semibold text-lg">Chat</h2>}
              <div className="flex items-center space-x-2">
                {/* Collapse/Expand Button */}
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-gray-800"
                  title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {sidebarCollapsed ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5 5-5M18 12H6" />
                    )}
                  </svg>
                </button>
                {/* Mobile Close Button */}
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* New Chat Button */}
          <div className="p-4">
            <button className={`w-full flex items-center text-left p-3 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {!sidebarCollapsed && <span>New chat</span>}
            </button>
          </div>

          {/* Navigation Section */}
          <div className="flex-1 px-4">
            <nav className="space-y-1">
              {/* Search Button/Input */}
              {isSearchMode && !sidebarCollapsed ? (
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearchKeyDown}
                    onBlur={(e) => {
                      // Use setTimeout to allow clicks on clear button to work
                      setTimeout(() => {
                        if (!searchQuery && document.activeElement !== e.target) {
                          setIsSearchMode(false);
                        }
                      }, 100);
                    }}
                    placeholder="Search your chats..."
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-8 py-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    autoFocus
                  />
                  <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSearchResults([]);
                      }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ) : (
                <button 
                  onClick={toggleSearchMode}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors text-gray-300 hover:bg-gray-800 ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}
                >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {!sidebarCollapsed && <span>Search chats</span>}
                </button>
              )}
              {/* <a href="#" className={`flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M9 7l3-3 3 3M4 10h16v11H4V10z" />
                </svg>
                {!sidebarCollapsed && <span>Tactics Library</span>}
              </a>
              <a href="#" className={`flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {!sidebarCollapsed && <span>Quick Tips</span>}
              </a> */}
            </nav>

            {/* Chat History Section */}
            {!sidebarCollapsed && (
              <div className="mt-6">
                <h3 className="text-gray-400 text-sm font-medium mb-2 px-3">
                  {isSearchMode ? 'Search Results' : ''}
                </h3>
                <div className="space-y-1">
                  {chatsLoading ? (
                    <div className="px-3 py-2 text-gray-400 text-sm">Loading chats...</div>
                  ) : isSearchMode ? (
                    // Search mode results
                    !searchQuery ? (
                      <div className="px-3 py-2 text-gray-400 text-sm">Type to search chats</div>
                    ) : searchResults.length === 0 ? (
                      <div className="px-3 py-2 text-gray-400 text-sm">No chats found</div>
                    ) : (
                      searchResults.map((chat) => (
                        <a 
                          key={chat._id} 
                          href="#" 
                          onClick={handleChatSelect}
                          className="block p-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors text-sm truncate"
                          title={chat.title}
                        >
                          {chat.title}
                        </a>
                      ))
                    )
                  ) : (
                    // Normal recent chats
                    recentChats.length === 0 ? (
                      <div className="px-3 py-2 text-gray-400 text-sm">No recent chats</div>
                    ) : (
                      recentChats.map((chat) => (
                        <a 
                          key={chat._id} 
                          href="#" 
                          onClick={handleChatSelect}
                          className="block p-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors text-sm truncate"
                          title={chat.title}
                        >
                          {chat.title}
                        </a>
                      ))
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-0' : 'lg:ml-0'
      }`}>
      {/* Chat Header */}
      <div className="bg-[#181C20] border-b border-secondary-dark p-4 flex items-center space-x-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-400 hover:text-white transition-colors mr-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
          <span className="text-2xl">⚽</span>
        </div>
        <div>
          <h1 className="text-white font-bold text-lg">Football Tactics Coach</h1>
          <p className="text-gray-400 text-sm">Your AI tactical advisor</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
            <div className={`${message.isBot ? 'max-w-4xl' : 'max-w-xs sm:max-w-md'} ${
              message.isBot 
                ? 'bg-[#181C20] text-white border border-secondary-dark' 
                : 'bg-secondary text-white'
            } rounded-lg p-3`}>
              {message.isBot && (
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg">⚽</span>
                  <span className="text-secondary font-semibold text-sm">Coach</span>
                </div>
              )}
              {message.isBot ? (
                <div className="text-sm prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown
                    components={{
                      h2: ({ children }) => (
                        <h2 className="text-lg font-bold text-secondary mb-3 mt-4 first:mt-0">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-base font-semibold text-white mb-2 mt-3">
                          {children}
                        </h3>
                      ),
                      p: ({ children }) => (
                        <p className="text-sm text-gray-200 mb-2 leading-relaxed">
                          {children}
                        </p>
                      ),
                      ul: ({ children }) => (
                        <ul className="text-sm text-gray-200 mb-3 ml-4 space-y-1">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="text-sm text-gray-200 mb-3 ml-4 space-y-2 list-decimal">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="text-sm text-gray-200 leading-relaxed">
                          {children}
                        </li>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold text-secondary">
                          {children}
                        </strong>
                      ),
                      em: ({ children }) => (
                        <em className="italic text-gray-300">
                          {children}
                        </em>
                      ),
                      code: ({ children }) => (
                        <code className="bg-gray-700 text-secondary px-1 py-0.5 rounded text-xs">
                          {children}
                        </code>
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="text-sm">{message.content}</p>
              )}
            </div>
          </div>
        ))}
        
        {/* Loading indicator */}
        {isLoadingResponse && (
          <div className="flex justify-start">
            <div className="max-w-xs sm:max-w-md bg-[#181C20] text-white border border-secondary-dark rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg">⚽</span>
                <span className="text-secondary font-semibold text-sm">Coach</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-gray-400 text-sm">Thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Questions (Collapsible) */}
      {showQuickQuestions && (
        <div className="p-4 border-t border-secondary-dark bg-[#181C20] animate-in slide-in-from-bottom duration-300">
          <p className="text-gray-400 text-sm mb-3">💡 Quick Questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => sendMessage(question)}
                disabled={isLoadingResponse}
                className="bg-primary hover:bg-secondary-dark disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50 text-white text-xs px-3 py-2 rounded-full border border-secondary-dark transition transform hover:scale-105"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-[#181C20] border-t border-secondary-dark">
        <div className="flex space-x-3">
          {/* Quick Questions Toggle Button */}
          <button
            onClick={() => setShowQuickQuestions(!showQuickQuestions)}
            className={`${
              showQuickQuestions 
                ? 'bg-secondary text-white' 
                : 'bg-primary text-gray-400 hover:text-secondary'
            } border border-secondary-dark rounded-lg px-3 py-3 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-secondary/50`}
            title="Toggle quick questions"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" opacity={showQuickQuestions ? 1 : 0.6}/>
              <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/>
            </svg>
          </button>

          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoadingResponse && sendMessage(inputMessage)}
            placeholder="Ask about formations, tactics, strategies..."
            disabled={isLoadingResponse}
            className="flex-1 bg-primary border border-secondary-dark rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            onClick={() => sendMessage(inputMessage)}
            disabled={!inputMessage.trim() || isLoadingResponse}
            className="bg-secondary hover:bg-secondary-dark disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-3 rounded-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-secondary/50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}