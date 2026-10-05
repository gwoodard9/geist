package dev.geist.geist_backend.llm;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/generate")
@CrossOrigin(origins = "http://localhost:5173") 

public class LlmController {

    private final LlmService llmService;

    public LlmController (LlmService llmService) {
        this.llmService = llmService;
    }

    @PostMapping
    public static ResponseEntity<String> generate(@RequestBody GenerateRequest request) {
        System.out.println("Prompt received: " + request.prompt());

        String response = LlmService.generate(request.prompt());
        
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    public record GenerateRequest(String prompt) {}
}