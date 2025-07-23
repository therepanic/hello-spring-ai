package com.example.hellospringai;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClientRequest;
import org.springframework.ai.chat.client.ChatClientResponse;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.client.advisor.api.Advisor;
import org.springframework.ai.chat.client.advisor.api.CallAdvisor;
import org.springframework.ai.chat.client.advisor.api.CallAdvisorChain;
import org.springframework.ai.chat.memory.ChatMemory;

@RequiredArgsConstructor
public class PerSessionMessageChatMemoryAdvisor implements CallAdvisor {

	private final ChatMemory chatMemory;

	private final HttpSession httpSession;

	@Override
	public ChatClientResponse adviseCall(ChatClientRequest chatClientRequest, CallAdvisorChain callAdvisorChain) {
		String sessionId = httpSession.getId();
		MessageChatMemoryAdvisor delegate = MessageChatMemoryAdvisor.builder(this.chatMemory)
			.conversationId(sessionId)
			.build();
		return delegate.adviseCall(chatClientRequest, callAdvisorChain);
	}

	@Override
	public String getName() {
		return this.getClass().getName();
	}

	@Override
	public int getOrder() {
		return Advisor.DEFAULT_CHAT_MEMORY_PRECEDENCE_ORDER;
	}

}
