package dream11_backend_Package.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class LieDetectorService {

    private final ChatClient chatClient;

    public LieDetectorService(ChatClient.Builder chatBuilder) {
        this.chatClient = chatBuilder.build();
    }

    public String verifyClaim(String claim) {
        String prompt = "You are an official cricket statistician. Fact-check this cricket claim: \"" + claim + "\". "
                + "State clearly whether it is TRUE, FALSE, or HALF-TRUTH, and explain why with real stats in 2 sentences.";

        try {
            // 🟢 Send to Gemini and return Gemini's answer directly!
            return chatClient.prompt()
                    .user(prompt)
                    .call()
                    .content();
        } catch (Exception e) {
            return "Unable to verify claim right now. Please try again later.";
        }
    }
}
