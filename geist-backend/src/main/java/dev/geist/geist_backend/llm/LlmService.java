package dev.geist.geist_backend.llm;

import org.springframework.stereotype.Service;

@Service
public class LlmService {

    private static LlmClient llmClient;

    public LlmService(LlmClient llmClient) {
        this.llmClient = llmClient;
    }

    static String generate(String prompt) {
        String draft = llmClient.generateDraft(prompt);
        return draft;
    }
}
