import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

function useRecaptcha() {
    const captchaRef = React.useRef<ReCAPTCHA>(null);
    const [isCaptchaValid, setIsCaptchaValid] = React.useState(false);
    
    const verifyToken = async () => {
        const token = captchaRef.current?.getValue();
        try {
        const response = await fetch("http://localhost:8080/validate", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            token: token,
            }),
        });
    
        if (response.ok) {
            console.log(response);
            setIsCaptchaValid(true);
        }
        } catch (error) {
        console.log("Error: ", error);
        captchaRef.current?.reset();
        }
    };
    
    return { captchaRef, isCaptchaValid, setIsCaptchaValid, verifyToken };
}

export default useRecaptcha;