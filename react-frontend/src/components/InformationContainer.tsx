import React from "react";

interface IInformationContainerProps {
    header: string;
    content: string;
    reference: string;
}

function InformationContainer (props:IInformationContainerProps) {
  return (
    <div className="flex flex-col w-[600px] my-auto gap-3">
          <h2 className="text-[24px] px-5 md:text-[36px]"> {props.header}</h2>
          <p className="text-justify text-[18px] px-5">
           {props.content}
          </p>
          <p className="text-[12px] text-[gray] pt-5 px-5">{props.reference}</p>
    </div>
    );
}

export default InformationContainer;