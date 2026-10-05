package dev.geist.geist_backend.llm;

import org.springframework.stereotype.Component;
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.ChatModel;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.Response;
import java.util.stream.Collectors;

@Component
public class LlmClient {
    public String generateDraft(String prompt) {
       OpenAIClient client = OpenAIOkHttpClient.fromEnv();

        ResponseCreateParams params = ResponseCreateParams.builder().input(prompt).model("gpt-6-sol").build();

        Response response = client.responses().create(params);
        return response.output().stream()
            .flatMap(item -> item.message().stream())
            .flatMap(message -> message.content().stream())
            .flatMap(content -> content.outputText().stream())
            .map(outputText -> outputText.text())
            .collect(Collectors.joining());
    }
}