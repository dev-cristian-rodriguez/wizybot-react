import { useState, FormEvent, useRef, useEffect } from 'react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

// Component for the message input field with send button
const MessageInput = ({ onSendMessage, isLoading }: MessageInputProps) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 120);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [input]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput && !isLoading) {
      onSendMessage(trimmedInput);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const trimmedInput = input.trim();
      if (trimmedInput && !isLoading) {
        onSendMessage(trimmedInput);
        setInput('');
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
        }
      }
    }
  };

  return (
    <div className="bg-white border-t border-gray-200/50">
      <form onSubmit={handleSubmit} className="flex items-end gap-2 p-4">
        <div className="flex-1 relative bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-primary-color focus-within:bg-white transition-all duration-200">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="w-full resize-none bg-transparent border-0 rounded-2xl px-4 py-3 pr-12 focus:outline-none focus:ring-0 text-gray-800 placeholder-gray-400 text-sm leading-relaxed"
            rows={1}
            disabled={isLoading}
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
          <div className="absolute right-3 bottom-3 text-xs text-gray-400 pointer-events-none">
            {input.length > 0 && (
              <span className="text-gray-400">Enter to send</span>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="flex-shrink-0 w-12 h-12 bg-primary-color text-white rounded-full font-semibold hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 disabled:active:scale-100 flex items-center justify-center"
          title="Send message"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
