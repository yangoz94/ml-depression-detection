import React from "react";
import { useContext } from "react";
import { RefContext } from "../contexts/RefContext";
import Button from "../components/Button";

function IntroContainer() {
  const context = useContext(RefContext);
  return (
    <div className="flex flex-col gap-3 min-h-fit md:min-h-[calc(100vh-40px)] p-5 m-5  rounded-xl md:gap-2 bg-GREEN_MAIN dark:bg-gray-800 dark:text-slate-300 ">
      <div className="w-36 rounded-xl bg-RED-GRADIENT ">
        <h3 className=" text-[white]"> Machine Learning </h3>
      </div>
      <div>
        <h1 className="md:text-[36px]">Depression Detection with BERT</h1>
        <h3 className="md:text-[24px] ">
          A Transformer-based Binary Classification Model
        </h3>
      </div>
      <img
        src="src/assets/wire.svg"
        alt="wire"
        className="w-[400px] scale-110 md:scale-100 md:w-[500px] animate-pulse mx-auto dark:filter invert"
      ></img>
      <div className="w-80 md:w-[450px]">
        <h3 className="text-justify">
          This model has 98% recall, precision and F1 scores. Trained with
          TensorFlow, built with React, Springboot and Docker.
        </h3>
      </div>
      <Button
        className="bg-RED-GRADIENT mx-auto my-5 animate-SCALER hover:bg-BLUE-GRADIENT w-80 md:w-[450px]"
        onClick={() => context.demoRef.current?.scrollIntoView()}
        children="Try it out!"
      />
    </div>
  );
}

export default IntroContainer;
