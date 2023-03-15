package com.depressiondetection.springbootbackend.Recaptcha;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin
public class RecaptchaController {
    private static final String RECAPTCHA_SECRET = "6Lcz5fYkAAAAAHXhLw3NWbA8Lub6qocm-Z7z96TT";

    @PostMapping("/validate")
    public boolean validateRecaptchaToken(@RequestBody RecaptchaRequest recaptchaRequest) {
        RestTemplate restTemplate = new RestTemplate();
        String recaptchaUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + RECAPTCHA_SECRET + "&response=" + recaptchaRequest.getToken();
        RecaptchaResponse response = restTemplate.postForObject(recaptchaUrl, null, RecaptchaResponse.class);
        assert response != null;
        System.out.println("response is " + response.isSuccess());
        return response.isSuccess();
    }
}
