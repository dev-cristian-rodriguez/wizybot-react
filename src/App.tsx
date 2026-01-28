import ChatInterface from '@/components/Chat/ChatInterface';
import EnvironmentSelector from '@/components/EnvironmentSelector/EnvironmentSelector';

// Main App component
function App() {
  return (
    <>
      <EnvironmentSelector />
      <ChatInterface />
    </>
  );
}

export default App;
