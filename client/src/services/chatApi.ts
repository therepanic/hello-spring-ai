import { Message } from "@/types/chat";

const API_BASE_URL = "/api/v1";

class ChatAPI {
    private sessionId: string | null = null;

    private async fetch(url: string, options: RequestInit = {}) {
        const response = await fetch(`${API_BASE_URL}${url}`, {
            ...options,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        const cookies = response.headers.get('Set-Cookie');
        if (cookies && cookies.includes('JSESSIONID')) {
            const match = cookies.match(/JSESSIONID=([^;]+)/);
            if (match) {
                this.sessionId = match[1];
            }
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response;
    }

    async sendMessage(prompt: string): Promise<string> {
        const body = new URLSearchParams();
        body.append('prompt', prompt);

        const response = await this.fetch('/call', {
            method: 'POST',
            body: body.toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        return response.text();
    }

    async getHistory(): Promise<Message[]> {
        const response = await this.fetch('/history');
        return response.json();
    }

    async clearHistory(): Promise<void> {
        await this.fetch('/history/clear', {
            method: 'DELETE',
        });
    }
}

export const chatAPI = new ChatAPI();