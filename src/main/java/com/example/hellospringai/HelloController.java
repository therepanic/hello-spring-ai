package com.example.hellospringai;

import jakarta.servlet.http.HttpSession;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.memory.MessageWindowChatMemory;
import org.springframework.ai.chat.messages.Message;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class HelloController {

    private final ChatMemory chatMemory;
    private final ChatClient chatClient;

    public HelloController(ChatClient.Builder chatClientBuilder, HttpSession httpSession) {
        this.chatMemory = MessageWindowChatMemory.builder().build();
        this.chatClient = chatClientBuilder.defaultAdvisors(new PerSessionMessageChatMemoryAdvisor(this.chatMemory, httpSession)).build();
    }

    @PostMapping("/call")
    public String call(@RequestParam String prompt) {
        return this.chatClient.prompt().messages().user(prompt).call().content();
    }

    @GetMapping("/history")
    public List<Message> history(HttpSession httpSession) {
        return this.chatMemory.get(httpSession.getId());
    }

    @DeleteMapping("/history/clear")
    public void clearHistory(HttpSession httpSession) {
        this.chatMemory.clear(httpSession.getId());
    }

}
