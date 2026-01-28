// Type definitions for chat functionality

// API Request/Response types
export interface ChatRequest {
  query: string;
}

export interface ChatResponse {
  response: string;
}

// Message types for UI
export type MessageRole = 'user' | 'bot';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

// API Error response
export interface ApiError {
  statusCode: number;
  message: string;
}
