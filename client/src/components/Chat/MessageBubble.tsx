import { Message } from "@/types/chat";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageBubble {
    message: Message;
}

export function MessageBubble({ message }: MessageBubble) {
    const isUser = message.messageType === 'USER';

    return (
        <div className={cn(
            "flex gap-3 max-w-[80%] animate-in slide-in-from-bottom-2 duration-300",
            isUser ? "ml-auto flex-row-reverse" : "mr-auto"
        )}>
            <div className={cn(
                "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full",
                isUser ? "bg-chat-user-bubble" : "bg-chat-ai-bubble"
            )}>
                {isUser ? (
                    <User className={cn(
                        "h-4 w-4",
                        isUser ? "text-chat-user-text" : "text-chat-ai-text"
                    )} />
                ) : (
                    <Bot className={cn(
                        "h-4 w-4",
                        isUser ? "text-chat-user-text" : "text-chat-ai-text"
                    )} />
                )}
            </div>

            <div className={cn(
                "rounded-2xl px-4 py-3 max-w-prose",
                isUser
                    ? "bg-chat-user-bubble text-chat-user-text rounded-br-md"
                    : "bg-chat-ai-bubble text-chat-ai-text rounded-bl-md"
            )}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {message.content}
                </p>
            </div>
        </div>
    );
}