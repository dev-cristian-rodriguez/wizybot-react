import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Environment = 'local' | 'prod';

interface EnvironmentState {
  environment: Environment;
  setEnvironment: (env: Environment) => void;
}

const STORAGE_KEY = 'wizybot-environment';

export const useEnvironmentStore = create<EnvironmentState>()(
  persist(
    (set) => ({
      environment: 'prod', // Default to prod
      setEnvironment: (env: Environment) => set({ environment: env }),
    }),
    {
      name: STORAGE_KEY,
    }
  )
);

// Helper function to get the API base URL based on environment
export const getApiBaseUrl = (): string => {
  const { environment } = useEnvironmentStore.getState();
  return environment === 'local'
    ? 'http://localhost:3000'
    : 'https://wizybot-nest.onrender.com';
};
