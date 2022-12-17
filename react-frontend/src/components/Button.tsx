import React from "react";

function Button(props: { label: string }) {
  return (
    <button
      className="bg-[white] text-lg w-80 mx-auto my-5 md:w-[450px] rounded-xl p-3 transition-all 
    duration-500 ease-in-out animate-SCALER  hover:text-[white] hover:bg-RED-GRADIENT"
    >
      {props.label}
    </button>
  );
}

export default Button;