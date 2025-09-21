import AIChat from './ai-chat';
import type { Metadata } from 'next';
import { AI } from './ai-provider';

export const metadata: Metadata = {
  title: 'AI Chat | SAMIR PRO',
  description: 'Chat with our advanced AI assistant, powered by Google Gemini. Ask questions, generate ideas, and get instant responses.',
};

export default function AIChatPage() {
  return (
    <AI>
      <div className="h-[calc(100vh-4rem)]">
        <AIChat />
      </div>
    </AI>
  );
}
