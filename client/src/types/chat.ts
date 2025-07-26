export interface Message {
    id: string;
    content: string;
    messageType: 'USER' | 'ASSISTANT';
}

export interface ChatResponse {
    content: string;
}