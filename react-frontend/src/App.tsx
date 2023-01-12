import { useState, useRef, RefObject } from "react";
import Button from "./components/Button";
import InformationContainer from "./components/InformationContainer";

function App() {
  const x: number = 5;
  const demoRef = useRef() as RefObject<HTMLDivElement>;
  return (
    <>
      {/* Main Landing Container */}
      <div className="flex flex-col gap-3 h-min-full m-5 bg-GREEN_MAIN p-5 rounded-xl md:gap-2">
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
        <Button
          label="Try it out!"
          onPress={() => demoRef.current?.scrollIntoView()}
        />
      </div>
      {/* Definitions Container */}
      <div className="flex flex-wrap gap-y-10 h-fit bg-GREEN_MAIN py-10 m-5 rounded-lg ">
        <InformationContainer
          header="What is a Transformer ?"
          content="A transformer model is a neural network that learns context and thus meaning by tracking relationships in sequential data like the words in this sentence.

          Transformer models apply an evolving set of mathematical techniques, called attention or self-attention, to detect subtle ways even distant data elements in a series influence and depend on each other.
          
          Transformers are translating text and speech in near real-time, opening meetings and classrooms to diverse and hearing-impaired attendees.

          They’re helping researchers understand the chains of genes in DNA and amino acids in proteins in ways that can speed drug design. Transformers can detect trends and anomalies to prevent fraud, streamline manufacturing, make online recommendations or improve healthcare.

          People use transformers every time they search on Google or Microsoft Bing or Yandex."
          reference="https://blogs.nvidia.com/blog/2022/03/25/what-is-a-transformer-model/"
        />
        <InformationContainer
          header="What is BERT ?"
          content="BERT, short for Bidirectional Encoder Representations from Transformers, is a Machine Learning (ML) model for natural language processing. It was developed in 2018 by researchers at Google AI Language and serves as a swiss army knife solution to 11+ of the most common language tasks, such as sentiment analysis and named entity recognition.

          Language has historically been difficult for computers to ‘understand’. Sure, computers can collect, store, and read text inputs but they lack basic language context.
          
          So, along came Natural Language Processing (NLP): the field of artificial intelligence aiming for computers to read, analyze, interpret and derive meaning from text and spoken words. This practice combines linguistics, statistics, and Machine Learning to assist computers in ‘understanding’ human language.BERT revolutionized the NLP space by solving the most common NLP tasks."
          reference="https://huggingface.co/blog/bert-101#1-what-is-bert-used-for"
        />
      </div>

      {/* Demo Container */}
      <div
        className="bg-GREEN_MAIN flex flex-col h-fit m-5  lg:gap-5 rounded-lg lg:flex-row"
        ref={demoRef}
      >
        <div className=" w-full my-auto p-5  ">
          <h1 className=" text-[24px] m-auto lg:text-[48px] lg:w-[250px]">
            What is your typical day like?
          </h1>
        </div>

        <div className="w-full p-5  ">
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

export default App;
