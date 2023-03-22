import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

function useRecaptcha() {
    const captchaRef = useRef<ReCAPTCHA>(null);
    const [isCaptchaValid, setIsCaptchaValid] = useState(false);
    
    const verifyToken = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_TOKEN_VERIFICATION_ENDPOINT as string, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: captchaRef.current?.getValue(),
                    }),
            } );
            if (response.ok) {
                setIsCaptchaValid(true);
            } else { 
                captchaRef.current?.reset();
            }
        } 
        catch (error) {
            console.log("Error: ", error);
        }
    };
    
    return { captchaRef, isCaptchaValid, setIsCaptchaValid, verifyToken };
}

export default useRecaptcha;