import React from "react";
import Button from "./Button";

function LandingPageContainer() {
  return (
    <div className="flex flex-col gap-3 h-min-full m-5 bg-[#f6f5ea] p-5 rounded-xl md:gap-2">
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
        className="w-[400px] scale-110 md:scale-100 md:w-[500px] animate-pulse mx-auto"
      ></img>
      <div className="w-80 md:w-[450px]">
        <h3 className="text-justify">
          This model has 98% recall, precision and F1 scores. Trained with
          TensorFlow, built with React, deployed on AWS Lambda.
        </h3>
      </div>
      <Button label="Try it out!" />
    </div>
  );
}
export default LandingPageContainer;
