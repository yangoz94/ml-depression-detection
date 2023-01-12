import React, { MouseEventHandler } from "react";

interface IButtonProps {
  label: string;
  onPress?: MouseEventHandler<HTMLButtonElement>;
}
function Button (props: IButtonProps) {

  return (
    <button
      className="bg-RED-GRADIENT text-lg w-80 mx-auto my-5 md:w-[450px] rounded-xl p-3 transition-all 
    duration-500 ease-in-out animate-SCALER  hover:text-[black] hover:bg-gradient-to-r from-sky-500 to-indigo-500"
    onClick = {props.onPress}
    >
      {props.label}
    </button>
  );  
}

export default Button;
