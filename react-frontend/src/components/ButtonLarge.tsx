import React, { MouseEventHandler } from "react";

interface IButtonProps {
  label: string,
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
function ButtonLarge (props: IButtonProps) {

  return (
    <button
      className= "bg-RED-GRADIENT text-lg  mx-auto my-5 w-[100px] md:w-[450px] rounded-xl p-3 hover:bg-BLUE-GRADIENT"
    onClick = {props.onClick}
    >
      {props.label}
    </button>
  );  
}

export default ButtonLarge;
