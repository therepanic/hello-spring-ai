import { useState, useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { Message } from "@/types/chat";
import { chatAPI } from "@/services/chatApi";
import { useToast } from "@/hooks/use-toast";

export function ChatContainer() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();
    const uniqueId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        try {
            const history = await chatAPI.getHistory();
            type RawMessage = { metadata?: { id?: string }, content?: string, text?: string, messageType: 'USER' | 'ASSISTANT' };
            const historyWithIds: Message[] = (history as RawMessage[]).map((m) => ({
                id: m.metadata?.id ?? uniqueId(),
                content: m.content ?? m.text ?? "",
                messageType: m.messageType,
            }));
            setMessages(historyWithIds);
        } catch (error) {
            console.error("Failed to load history:", error);
            toast({
                title: "Error",
                description: "Failed to load message history",
                variant: "destructive",
            });
        }
    };

    const handleSendMessage = async (content: string) => {
        const userMessage: Message = {
            id: uniqueId(),
            content,
            messageType: 'USER',
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await chatAPI.sendMessage(content);

            const aiMessage: Message = {
                id: uniqueId(),
                content: response,
                messageType: 'ASSISTANT',
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Failed to send message:", error);
            toast({
                title: "Error",
                description: "Failed to send message",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearHistory = async () => {
        try {
            await chatAPI.clearHistory();
            setMessages([]);
            toast({
                title: "Success",
                description: "Message history cleared",
            });
        } catch (error) {
            console.error("Failed to clear history:", error);
            toast({
                title: "Error",
                description: "Failed to clear history",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto h-full flex flex-col bg-card rounded-3xl shadow-lg border border-border">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
                <div>
                    <h1 className="text-xl font-semibold text-foreground">Hello Spring AI</h1>
                    <p className="text-sm text-muted-foreground">Chat with artificial intelligence</p>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClearHistory}
                    className="h-10 w-10 rounded-full hover:bg-destructive/10 hover:text-destructive"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🍃</div>
                        <h3 className="text-lg font-medium text-foreground mb-2">
                            Start a conversation with AI
                        </h3>
                        <p className="text-muted-foreground">
                            Send a message to begin chatting
                        </p>
                    </div>
                ) : (
                    messages.map((message) => (
                        <MessageBubble key={message.id} message={message} />
                    ))
                )}

                {isLoading && (
                    <div className="flex gap-3 max-w-[80%] mr-auto">
                        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-chat-ai-bubble">
                            <Loader2 className="h-4 w-4 animate-spin text-chat-ai-text" />
                        </div>
                        <div className="bg-chat-ai-bubble text-chat-ai-text rounded-2xl rounded-bl-md px-4 py-3">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-border">
                <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
            </div>
        </div>
    );
}