import React from "react";
import { useState, useEffect, RefObject, useContext } from "react";
import { RefContext } from "../contexts/RefContext";

function DemoContainer() {
  const context = useContext(RefContext);
  const [isResultPopUpOpen, setIsResultPopUpOpen] = useState(false);
  let previousTextInputValue:
    | RefObject<HTMLTextAreaElement>
    | undefined
    | string;

  /* The following useEffect ensures the previousTextInputValue is 
  updated whenever the inputRef.current.value changes(because refs break referential equality) 
  */
  useEffect(() => {
    previousTextInputValue = context.inputRef.current?.value;
  }, [context.inputRef.current?.value]);

  const sendInputHandler = () => {
    // The following code block prevents unnecessary data from being sent to the backend (a. empty string, b. same input as before)
    if (
      (context.inputRef.current?.value.length as number) > 0 &&
      previousTextInputValue !== context.inputRef.current?.value
    ) {
      console.log("current value ", context.inputRef.current?.value);
      console.log("previous value ", previousTextInputValue);
      setIsResultPopUpOpen( isResultPopUpOpen => !isResultPopUpOpen);
      console.log("POPUP WINDOW IS ", isResultPopUpOpen);
    }
  };

  return (
    <div
      className="bg-GREEN_MAIN flex flex-col h-fit m-5  lg:gap-5 rounded-lg lg:flex-row"
      ref={context.demoRef}
    >
      <div className=" w-full my-auto p-5  ">
        <h1 className=" text-[24px] m-auto lg:text-[48px] lg:w-[250px]">
          What is your typical day like?
        </h1>
      </div>

      <div className="w-full p-5  ">
        <textarea
          className="h-[400px] w-full p-5 text-2xl lg:text-4xl text-center text-gray-500 rounded-lg border-none outline-none resize-none lg:py-28 lg:bg-transparent "
          placeholder="Please enter your input here. For example,  I usually struggle with waking up early in the mornings...  "
          ref={context.inputRef}
        />
      </div>
      <div className="flex flex-col bg-inherit w-full gap-5 m-auto pb-5 ">
        <button
          className="bg-[gray] lg:bg-gray text-white lg:text-2xl h-min mx-auto my-5 w-1/2
           lg:w-[280px] lg:h-[150px] transition-all ease-linear duration-300  rounded-xl p-3
            hover:bg-[gray] hover:scale-105"
          onClick={sendInputHandler}
        >
          Click to See the Result
        </button>
      </div>
    </div>
  );
}

export default DemoContainer;
