import { useState, useContext, useRef } from "react";
import { RefContext } from "../contexts/RefContext";
import { FormEvent } from "react";
import { headers } from "../utilities/headers";

function useInputSender() {
  const context = useContext(RefContext);
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendInput = async () => {
    if (context.inputRef.current?.value.length < 20) {
      alert("Please enter at least 20 characters.");
      return;
    }

    setIsLoading(true);
    const response = await fetch(import.meta.env.VITE_INPUT_POST_ENDPOINT, {
      method: "POST",
      headers: headers,
      mode: "cors",
      body: JSON.stringify({
        input: context.inputRef.current?.value,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const output = data.statement;
      setOutput(output); // update the output state with the retrieved value
    } else {
      console.log("Response is ", response);
      console.log("Error:", response.status);
      alert(
        "Sorry, we used all our limited resources. Try again in a few seconds...: " +
          response.status
      );
    }
    setIsLoading(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendInput();
  };

  return { output, isLoading, setOutput, handleSubmit };
}

export default useInputSender;
