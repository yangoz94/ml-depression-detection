import React from "react";

function Description() {
  return (
    <div className="w-80 md:w-[450px]">
      <h3 className="text-justify">
        This model has 98% recall, precision and F1 scores. Built with
        TensorFlow, deployed on AWS Lambda.
      </h3>
    </div>
  );
}

export default Description;
