import { useState, useContext, useRef } from "react";
import { RefContext } from "../contexts/RefContext";
import ReCAPTCHA from "react-google-recaptcha";
import { WEB_KEY } from "../utilities/utilities";
import Button from "./Button";


function DemoContainer() {
  const captchaRef = useRef<ReCAPTCHA>(null);
  const context = useContext(RefContext);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const sendInput = async () => {
    if (context.inputRef.current?.value) {
      if (!isCaptchaValid) {
        alert("Please complete the reCAPTCHA...");
        return;
      }
      const inputText = context.inputRef.current?.value;
      try {
        const response = await fetch("http://localhost:8080/processInput", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input: inputText,
          }),
        });

        if (response.ok) {
          console.log(response);
          // handle success response
        } else {
          console.log("Error: ", response.statusText);
          // handle error response
        }
      } catch (error) {
        console.log("Error: ", error);
        // handle network error
      }
    } else {
      alert("Please enter your input...");
    }
  };

  const verifyToken = async () => {
    const token = captchaRef.current?.getValue();
    try {
      const response = await fetch("http://localhost:8080/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers":
          "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
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
    }
  };

  return (
    <form
      className="bg-GREEN_MAIN flex flex-col h-fit m-5 lg:gap-5 rounded-lg lg:flex-row"
      ref={context.demoRef}
      onSubmit={(e) => {
        e.preventDefault();
        sendInput();
      }}
    >
      <div className=" w-full my-auto p-5  ">
        <h1 className=" text-[24px] m-auto lg:text-[48px] lg:w-[250px]">
          What is your typical day like?
        </h1>
      </div>

      <div className="w-full p-5">
        <textarea
          className="h-[400px] w-full p-5 text-2xl lg:text-4xl text-center text-gray-500 rounded-lg border-none outline-none resize-none lg:py-28 lg:bg-transparent"
          placeholder="Please enter your input here. For example, I usually struggle with waking up early in the mornings..."
          ref={context.inputRef}
        />
      </div>

      <div className="flex flex-col w-full m-auto pt-5 ">
        <ReCAPTCHA
          sitekey={WEB_KEY}
          ref={captchaRef}
          onChange={verifyToken}
          onExpired={() => setIsCaptchaValid(false)}
        />

        <Button
          type="submit"
          className={`${isCaptchaValid ? "bg-RED-GRADIENT hover:bg-BLUE-GRADIENT" : "bg-gray-500"} w-[300px]`}
          children={isCaptchaValid ? "Click to See the Result" : "CAPTCHA Required"}
          disabled={!isCaptchaValid}
        />
      </div>
    </form>
  );
}

export default DemoContainer;
