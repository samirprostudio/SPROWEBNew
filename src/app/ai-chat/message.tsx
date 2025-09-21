'use client';

import { Bot, User } from 'lucide-react';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ChatMessageProps {
  children: ReactNode;
  isUser: boolean;
}

function ChatMessage({ children, isUser }: ChatMessageProps) {
  return (
    <div className={cn('flex items-start gap-4', isUser && 'justify-end')}>
      {!isUser && (
        <Avatar className="h-8 w-8 border">
          <AvatarFallback><Bot/></AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-md rounded-lg p-3',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground'
        )}
      >
        <div className="prose prose-sm prose-invert text-current max-w-none break-words">{children}</div>
      </div>
      {isUser && (
        <Avatar className="h-8 w-8 border">
          <AvatarFallback><User /></AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

export function UserMessage({ children }: { children: ReactNode }) {
  return <ChatMessage isUser={true}>{children}</ChatMessage>;
}

export function AssistantMessage({ children }: { children: ReactNode }) {
  return <ChatMessage isUser={false}>{children}</ChatMessage>;
}
