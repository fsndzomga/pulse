import { ChatInterface } from '@/components/chat-interface';

export default function ChatPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Health Chat Assistant</h1>
      <ChatInterface />
    </div>
  );
}
