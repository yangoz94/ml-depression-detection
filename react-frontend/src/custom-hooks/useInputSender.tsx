import { useState, useContext, useRef } from "react";
import { RefContext } from "../contexts/RefContext";
import { FormEvent } from "react";

function useInputSender() {
  const context = useContext(RefContext);
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
      const data = await response.json();
      const output = data.statement;
      console.log(output.statement);
      setOutput(output); // update the output state with the retrieved value
    } else {
      console.log('Error:', response.status);
      alert('Oops there is a problem on our end. Please try again...: ' + response.status)
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