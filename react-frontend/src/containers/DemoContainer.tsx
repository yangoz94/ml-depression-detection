import ReCAPTCHA from "react-google-recaptcha";
import Button from "../components/Button";
import Loading from "../components/Loading";
import useRecaptcha from "../custom-hooks/useRecaptcha";
import useInputSender from "../custom-hooks/useInputSender";
import useModal from "../custom-hooks/useModal";
import { useContext } from "react";
import BasicModal from "../components/BasicModal";
import { RefContext } from "../contexts/RefContext";



function DemoContainer() {
  const context = useContext(RefContext);
  // Custom hooks
  const { captchaRef, isCaptchaValid, setIsCaptchaValid, verifyToken } = useRecaptcha();
  const { output, isLoading, setOutput, handleSubmit} = useInputSender();
  const { isModalOpen, handleModalOnClose } = useModal({output,setOutput});

  return (
    <form
      className="flex flex-col h-fit m-5 lg:gap-5 rounded-lg lg:flex-row bg-GREEN_MAIN dark:bg-slate-600 "
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
          sitekey={process.env.WEB_KEY as string}
          ref={captchaRef}
          onChange={verifyToken}
          onExpired={() => setIsCaptchaValid(false)}
          onErrored={() => setIsCaptchaValid(false)}
        />
        <Button
          type="submit"
          className={`${isCaptchaValid ? "bg-RED-GRADIENT hover:bg-BLUE-GRADIENT" : "bg-gray-500"} w-[300px]`}
          children={isCaptchaValid ? "Click to See the Result" : "CAPTCHA Required"}
          disabled={!isCaptchaValid}
        />
        {isLoading && <Loading isLoading={isLoading} />}
        {isModalOpen && <BasicModal open={isModalOpen} onClose={handleModalOnClose} output={output} />}
      </div>
    </form>
  );
}

export default DemoContainer;
