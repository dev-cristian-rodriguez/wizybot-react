import api from '@/core/axios/api';
import { ChatRequest, ChatResponse } from '@/types/chat.types';

// Service to interact with the chatbot API
const chatService = {
  // Send a query to the chatbot
  sendMessage: async (query: string): Promise<ChatResponse> => {
    const request: ChatRequest = { query };
    // console.log('chatService.sendMessage - request:', request);
    const response = await api.post<ChatResponse>('/chat', request);
    return response.data;
  },
};

export default chatService;
