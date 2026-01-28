import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import { Message } from '@/types/chat.types';
import GeneralLoader from '../Loader/GeneralLoader';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

// Component to display the list of chat messages
const MessageList = ({ messages, isLoading }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="h-full overflow-y-auto p-4 space-y-2">
      {messages.length === 0 && !isLoading && (
        <div className="flex items-center justify-center h-full text-gray-500 min-h-[400px]">
          <div className="text-center">
            <p className="text-lg font-medium mb-2">Welcome to Wizybot!</p>
            <p className="text-sm">
              Ask me anything about products or currency conversion.
            </p>
            <div className="mt-4 text-xs space-y-1">
              <p className="font-medium">Try asking:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>"I am looking for a phone"</li>
                <li>"How much does a watch cost?"</li>
                <li>"What is the price of the watch in Euros"</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {isLoading && (
        <div className="flex justify-start mb-4">
          <div className="bg-gray-200 rounded-lg rounded-bl-none px-4 py-2">
            <GeneralLoader />
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
