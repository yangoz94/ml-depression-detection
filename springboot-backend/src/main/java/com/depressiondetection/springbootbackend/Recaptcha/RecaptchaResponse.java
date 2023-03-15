package com.depressiondetection.springbootbackend.Recaptcha;

public class RecaptchaResponse {
    private boolean success;
    private String challenge_ts;
    private String hostname;

    public boolean isSuccess() {
        return success;
    }

}
