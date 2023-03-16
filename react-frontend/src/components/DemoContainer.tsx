import ReCAPTCHA from "react-google-recaptcha";
import { WEB_KEY } from "../utilities/utilities";
import Button from "./Button";
import Spinner from "./Spinner";
import { Backdrop } from "@mui/material";
import useInputProcessing from "../custom-hooks/useInputProcessing";

function DemoContainer() {
  const {
    captchaRef,context,isCaptchaValid,setIsCaptchaValid,output,isLoading,verifyToken,handleSubmit,
  } = useInputProcessing(); //custom hook

  return (
    <form
      className="bg-GREEN_MAIN flex flex-col h-fit m-5 lg:gap-5 rounded-lg lg:flex-row"
      ref={context.demoRef}
      onSubmit={handleSubmit}
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
          onErrored={() => setIsCaptchaValid(false)}
        />
        <Button
          type="submit"
          className={`${
            isCaptchaValid
              ? "bg-RED-GRADIENT hover:bg-BLUE-GRADIENT"
              : "bg-gray-500"
          } w-[300px]`}
          children={
            isCaptchaValid ? "Click to See the Result" : "CAPTCHA Required"
          }
          disabled={!isCaptchaValid}
        />
        {isLoading && (
          <Backdrop
            open={isLoading}
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            {" "}
            <Spinner />
          </Backdrop>
        )}
      </div>
    </form>
  );
}

export default DemoContainer;
