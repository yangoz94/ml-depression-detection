package com.depressiondetection.springbootbackend.Recaptcha;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin
public class RecaptchaController {
    private static final String RECAPTCHA_SECRET = System.getenv("RECAPTCHA_SECRET");
    private static final String RECAPTCHA_API = "https://www.google.com/recaptcha/api/siteverify?secret=";
    private static final String RECAPTCHA_TAG = "&response=";
    private static final String RECAPTCHA_URL = RECAPTCHA_API + RECAPTCHA_SECRET + RECAPTCHA_TAG;

    @PostMapping("/validate")
    public ResponseEntity<Boolean> validateRecaptchaToken(@RequestBody RecaptchaRequest recaptchaRequest) {
        RestTemplate restTemplate = new RestTemplate();
        String recaptchaUrl = RECAPTCHA_URL + recaptchaRequest.getToken();
        RecaptchaResponse response = restTemplate.postForObject(recaptchaUrl, "null", RecaptchaResponse.class);
        assert response != null;
        System.out.println("response is " + response.isSuccess());
        if (response.isSuccess()) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(false);
        }
    }

}
