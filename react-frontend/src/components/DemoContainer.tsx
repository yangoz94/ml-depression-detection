import React from "react";

function DemoContainer() {
  const x: number = 2;
  return (
    <>
      <div className="bg-[#f6f5ea] flex flex-col h-fit m-5  lg:gap-5 rounded-lg lg:flex-row">
        <div className=" w-full min-h-[100px] my-auto p-5  ">
          <h1 className=" text-[3rem] w-fit text-center mx-auto lg:text-[3rem] lg:w-[250px] lg:mx-auto">
            What is your typical day like?
          </h1>
        </div>

        <div className="w-full p-5 ">
          <textarea
            className="h-[400px] w-full p-5 text-2xl lg:text-4xl text-center text-gray-500 rounded-lg border-none outline-none resize-none lg:py-28 lg:bg-transparent "
            placeholder="Please enter your input here. For example,  I usually struggle with waking up early in the mornings...  "
          />
        </div>
        <div className="flex flex-col bg-inherit w-full gap-5 m-auto pb-5 ">
          <div
            className={`flex w-[300px] scale-75  text-3xl  text-black rounded-[300px]  h-[300px] p-5 ${
              x === 5 ? "bg-[red]" : "bg-[white]"
            }`}
          >
            <h1 className="m-auto"> Click to See the Result</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default DemoContainer;
