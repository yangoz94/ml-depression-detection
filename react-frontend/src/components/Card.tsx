import React from "react";

function Card(props: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-10 w-screen m-5 bg-[#f6f5ea] p-5 rounded-xl md:gap-1">
      {props.children}
    </div>
  );
}

export default Card;