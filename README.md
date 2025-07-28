# Hello Spring AI 🍃

> A minimalistic AI chat template using Spring Boot + Spring AI (OpenAI) for the backend and modern React (Vite + shadcn/ui) for the frontend.

---

## ✨ Overview

- **Backend:** Spring Boot 3.5 + Spring AI (OpenAI)
- **Frontend:** Vite + React 18 + TypeScript + shadcn/ui
- **Features:**
  - Chat with AI (OpenAI, with conversation history)
  - Clear chat history
  - Light/Dark theme toggle
  - Modern UI/UX

---

## 🚦 Quick Start

### 1. Clone the repository
```bash
git clone <this-repo-url>
cd hello-spring-ai
```

### 2. Set up environment variables
Create a `.env` file or set the variables in your system (see below).

#### Example `.env` for backend:
```env
SPRING_AI_OPENAI_API-KEY=sk-... # your OpenAI API key
SPRING_AI_OPENAI_BASE-URL=https://api.openai.com
SPRING_AI_OPENAI_CHAT_OPTIONS_MODEL=gpt-4o
```

### 3. Run the backend (Spring Boot)
```bash
./gradlew bootRun
# or on Windows:
gradlew.bat bootRun
```

Backend will be available at `http://localhost:8080`

### 4. Run the frontend (React)
```bash
cd client
npm install
npm run dev
```

Frontend will be available at `http://localhost:9000` (API requests are automatically proxied to the backend)

---

## 🛠️ API Endpoints

All endpoints are available under the `/api/v1` prefix:

| Method  | URL                  | Description                       |
|---------|----------------------|-----------------------------------|
| POST    | `/call`              | Send a prompt to the AI, get reply|
| GET     | `/history`           | Get chat message history          |
| DELETE  | `/history/clear`     | Clear chat message history        |

### Example requests

#### Send a message
```bash
curl -X POST 'http://localhost:8080/api/v1/call' -d 'prompt=Hello, who are you?'
```

#### Get history
```bash
curl 'http://localhost:8080/api/v1/history'
```

#### Clear history
```bash
curl -X DELETE 'http://localhost:8080/api/v1/history/clear'
```
