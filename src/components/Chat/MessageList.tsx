import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import { Message } from '@/types/chat.types';
import GeneralLoader from '../Loader/GeneralLoader';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  onSuggestionClick?: (suggestion: string) => void;
}

// Component to display the list of chat messages
const MessageList = ({ messages, isLoading, onSuggestionClick }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="h-full overflow-y-auto scroll-smooth pt-4 pb-4">
      {messages.length === 0 && !isLoading && (
        <div className="flex items-center justify-center h-full min-h-[400px] px-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-color flex items-center justify-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white"
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
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Wizybot!</h2>
            <p className="text-gray-600 mb-6">
              I'm your AI assistant. I can help you find products and convert currencies.
            </p>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p className="text-sm font-semibold text-gray-700 mb-3">Try asking me:</p>
              <div className="space-y-2">
                {[
                  "I am looking for a phone",
                  "How much does a watch cost?",
                  "What is the price of the watch in Euros"
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => onSuggestionClick?.(suggestion)}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 bg-gray-50 hover:bg-primary-color hover:text-white rounded-lg border border-gray-200 hover:border-primary-color transition-all duration-200 cursor-pointer"
                  >
                    "{suggestion}"
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {isLoading && (
        <div className="flex justify-start mb-5 px-4">
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full bg-primary-color flex items-center justify-center flex-shrink-0 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-chat border border-gray-100">
              <GeneralLoader />
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
