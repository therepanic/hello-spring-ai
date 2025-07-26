import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && !isLoading) {
            onSendMessage(message.trim());
            setMessage("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-3 items-end">
            <div className="flex-1">
                <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="min-h-[60px] max-h-[120px] resize-none bg-chat-input border-chat-input-border focus:ring-2 focus:ring-primary rounded-2xl"
                    disabled={isLoading}
                />
            </div>
            <Button
                type="submit"
                size="icon"
                disabled={!message.trim() || isLoading}
                className="h-[60px] w-[60px] rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
            >
                <Send className="h-5 w-5" />
            </Button>
        </form>
    );
}