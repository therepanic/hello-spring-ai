import { ChatContainer } from "@/components/Chat/ChatContainer";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
    return (
        <div className="h-screen bg-gradient-to-br from-background to-muted/30 p-4 overflow-hidden">
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>

            <div className="h-full flex flex-col items-center justify-center overflow-hidden">
                <div className="w-full max-w-4xl h-[600px] overflow-hidden">
                    <ChatContainer />
                </div>
            </div>
        </div>
    );
};

export default Index;