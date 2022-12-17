import React from "react";

function Image(props: { src: string }) {
  return (
    <div>
      <img
        src={props.src}
        className="w-[400px] scale-110 md:scale-100 md:w-[500px] animate-pulse"
      ></img>
    </div>
  );
}

export default Image;
