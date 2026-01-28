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
      <div className="bg-primary-color text-white p-4 shadow-md">
        <h1 className="text-xl font-semibold">Wizybot Chat</h1>
        <p className="text-sm text-white/80">AI Customer Support & Sales Agent</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden min-h-0">
        <MessageList messages={messages} isLoading={isLoading} />
      </div>

      {/* Input */}
      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatInterface;
