import { useState, useContext, useRef } from "react";
import { RefContext } from "../contexts/RefContext";
import { FormEvent } from "react";

function useInputSender() {
  const context = useContext(RefContext);
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const sendInput = async () => {

    if (!context.inputRef.current?.value) {
      alert('Please enter your input.');
      return;
    }
    setIsLoading(true);
    const response = await fetch(import.meta.env.VITE_INPUT_POST_ENDPOINT as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: context.inputRef.current?.value
      })
    });

    if (response.ok) {
      const data = await response.json();
      const output = data.statement;
      setOutput(output); // update the output state with the retrieved value
    } else {
      console.log('Error:', response.status);
      alert('Sorry, we used all our limited resources. Try again in a few seconds...: ' + response.status)
    }
    setIsLoading(false);  
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendInput();
  }

  return {output, isLoading, setOutput, handleSubmit }
}

export default useInputSender;