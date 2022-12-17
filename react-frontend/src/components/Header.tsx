import React from "react";

function Header() {
  return (
    <>
      <div className="w-36 rounded-xl bg-RED-GRADIENT  ">
        <h3 className=" text-[white]"> Machine Learning </h3>
      </div>
      <div>
        <h1 className="md:text-[36px]">Depression Detection with BERT</h1>
        <h3 className="md:text-[24px] ">
          A Transformer-based Binary Classification Model
        </h3>
      </div>
    </>
  );
}

export default Header;
