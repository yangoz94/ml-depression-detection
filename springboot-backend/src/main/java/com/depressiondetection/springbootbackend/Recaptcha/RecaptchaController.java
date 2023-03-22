package com.depressiondetection.springbootbackend.Recaptcha;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class RecaptchaController {
    private final RecaptchaService recaptchaService;

    @Autowired
    public RecaptchaController (RecaptchaService recaptchaService) {
        this.recaptchaService = recaptchaService;
    }

    @PostMapping("/validate")
    public ResponseEntity<Boolean> validateRecaptchaToken(@RequestBody RecaptchaRequest recaptchaRequest) {
        return recaptchaService.validateRecaptchaToken(recaptchaRequest);
    }
}
