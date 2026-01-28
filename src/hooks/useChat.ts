import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import chatService from '@/core/services/chat.service';
import { ChatResponse } from '@/types/chat.types';

// Custom hook for chat functionality using React Query
export const useChat = () => {
  const mutation = useMutation({
    mutationFn: async (query: string): Promise<ChatResponse> => {
      return await chatService.sendMessage(query);
    },
    onError: (error: any) => {
      console.error('useChat error:', error);
      // Handle different error types
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || 'An error occurred';

        if (status === 400) {
          toast.error('Invalid request. Please check your message.');
        } else if (status === 500) {
          toast.error('Server error. Please try again later.');
        } else {
          toast.error(message);
        }
      } else if (error.request) {
        toast.error(
          'Unable to connect to the server. Please make sure the backend is running.'
        );
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    },
  });

  return {
    sendMessage: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
