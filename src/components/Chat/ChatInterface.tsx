import { useState, useCallback } from 'react';
import { useChat } from '@/hooks/useChat';
import { toast } from 'sonner';

import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { Message } from '@/types/chat.types';

// Main Chat Interface component
const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { sendMessage, isLoading } = useChat();

  const handleSendMessage = useCallback(
    async (content: string) => {
      // Add user message immediately
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);

      try {
        // Send message to API
        const response = await sendMessage(content);

        // Add bot response
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          role: 'bot',
          content: response.response,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error('Error in handleSendMessage:', error);
        // debugger;
        // Error handling is done in the hook, but we can show a user-friendly message
        const errorMessage: Message = {
          id: `error-${Date.now()}`,
          role: 'bot',
          content:
            'Sorry, I encountered an error. Please try again or check if the backend server is running.',
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, errorMessage]);
        toast.error('Failed to send message. Please try again.');
      }
    },
    [sendMessage]
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary-color text-white shadow-lg">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold">Wizybot</h1>
              <p className="text-sm text-white/90 font-medium">AI Assistant</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden min-h-0 bg-white">
        <MessageList 
          messages={messages} 
          isLoading={isLoading} 
          onSuggestionClick={handleSendMessage}
        />
      </div>

      {/* Input */}
      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatInterface;
