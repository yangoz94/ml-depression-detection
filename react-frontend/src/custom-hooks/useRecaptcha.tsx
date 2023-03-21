import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

function useRecaptcha() {
    const captchaRef = React.useRef<ReCAPTCHA>(null);
    const [isCaptchaValid, setIsCaptchaValid] = React.useState(false);

    const tokenVerificationRequestBody = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        token: captchaRef.current?.getValue(),
        }),
    };
    
    const verifyToken = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_TOKEN_VERIFICATION_ENDPOINT as string, tokenVerificationRequestBody );
            if (response.ok) {
                console.log(response);
                setIsCaptchaValid(true);
            }
        } 
        catch (error) {
            console.log("Error: ", error);
            captchaRef.current?.reset();
        }
    };
    
    return { captchaRef, isCaptchaValid, setIsCaptchaValid, verifyToken };
}

export default useRecaptcha;