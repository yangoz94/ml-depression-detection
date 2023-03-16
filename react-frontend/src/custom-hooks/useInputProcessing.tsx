import { useState, useContext, useRef } from "react";
import { RefContext } from "../contexts/RefContext";
import ReCAPTCHA from "react-google-recaptcha";

function useInputProcessing() {
  const captchaRef = useRef<ReCAPTCHA>(null);
  const context = useContext(RefContext);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const sendInput = async () => {
    setIsLoading(true);
    const response = await fetch('http://localhost:8080/processInput', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: context.inputRef.current?.value
      })
    });

    if (response.ok) {
      const output = await response.json();
      console.log(output)
      setOutput(output); // update the output state with the retrieved value
    } else {
      console.log('Error:', response.status);
    }
    setIsLoading(false);
  }
  
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendInput();
  }

  return { captchaRef, context, isCaptchaValid,setIsCaptchaValid, output, isLoading, verifyToken, handleSubmit }
}

export default useInputProcessing;
