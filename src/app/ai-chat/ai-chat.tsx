'use client';

import { useState, useRef, useEffect } from 'react';
import { useUIState, useActions } from 'ai/rsc';
import type { AI } from './ai-provider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Plus, Loader2, Bot } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { UIState } from './ai-provider';
import { useToast } from '@/hooks/use-toast';
import { UserMessage } from './message';

export default function AIChat() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useUIState<typeof AI>();
  const { continueConversation } = useActions<typeof AI>();
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) return;

    const currentInputValue = inputValue;
    setInputValue('');
    
    setMessages((currentMessages: UIState) => [
      ...currentMessages,
      {
        id: Date.now().toString(),
        display: <UserMessage>{currentInputValue}</UserMessage>,
      },
    ]);
    
    setIsPending(true);

    try {
        const assistantResponse = await continueConversation(currentInputValue);

        setMessages((currentMessages: UIState) => [
            ...currentMessages,
            assistantResponse
        ]);
    } catch (error) {
       console.error('Error during conversation:', error);
       toast({
        title: 'Error',
        description: 'Something went wrong. Please check the console and try again.',
        variant: 'destructive',
      });
    } finally {
        setIsPending(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <header className="bg-card p-4 border-b flex items-center gap-4">
        <Bot className="h-8 w-8 text-primary" />
        <div>
            <h1 className="text-xl font-headline font-bold">AI Assistant</h1>
            <p className="text-sm text-muted-foreground">Powered by Gemini</p>
        </div>
      </header>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {messages.length > 0 ? (
            messages.map((m: UIState[number]) => <div key={m.id}>{m.display}</div>)
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <p>Start a conversation with our AI assistant.</p>
              <p>You can ask questions, brainstorm ideas, or get help with your writing.</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="border-t bg-card p-4">
        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
          <Button variant="outline" size="icon" className="flex-shrink-0" type="button">
            <Plus className="h-4 w-4" />
          </Button>
          <div className="relative w-full">
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything..."
              className="pr-12"
              disabled={isPending}
            />
          </div>
          <Button type="submit" size="icon" className="flex-shrink-0" disabled={!inputValue || isPending}>
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </div>
    </div>
  );
}
