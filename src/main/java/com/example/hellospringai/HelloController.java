package com.example.hellospringai;

import jakarta.servlet.http.HttpSession;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.memory.MessageWindowChatMemory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    private final ChatClient chatClient;

    public HelloController(ChatClient.Builder chatClientBuilder, HttpSession httpSession) {
        this.chatClient = chatClientBuilder.defaultAdvisors(new PerSessionMessageChatMemoryAdvisor(MessageWindowChatMemory.builder().build(), httpSession)).build();
    }

    @PostMapping("/call")
    public String call(@RequestParam String prompt) {
        return this.chatClient.prompt().messages().user(prompt).call().content();
    }

}
