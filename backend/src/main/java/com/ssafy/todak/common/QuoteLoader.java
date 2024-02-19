package com.ssafy.todak.common;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class QuoteLoader {
    private final String QUOTE_URL = "https://raw.githubusercontent.com/golbin/hubot-maxim/master/data/maxim.json";
    private final RestTemplate restTemplate;

    public QuoteLoader(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String[] getRandomQuote() {
        ResponseEntity<String> response = restTemplate.getForEntity(QUOTE_URL, String.class);
        if (response.getStatusCode().is2xxSuccessful()) {
            String responseBody = response.getBody();
            //System.out.println("responseBody: " + responseBody);
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                JsonNode root = objectMapper.readTree(responseBody);
                int randomIndex = (int) (Math.random() * root.size());
                JsonNode randomQuote = root.get(randomIndex);
                String author = randomQuote.get("author").asText();
                String message = randomQuote.get("message").asText();
                return new String[] {author, message};
            } catch (Exception e) {
                e.printStackTrace();
                return new String[] {"-1", "Error occurred while processing quotes."};
            }
        } else {
            return new String[] {"-1", "Failed to fetch quotes."};
        }
    }
}
