import React from "react";
import InformationContainer from "../components/Information";

function DefinitionsContainer() {
  const INFORMATION_CONTAINER_DATA = [
    {
      header: "What is a Transformer ?",
      content:
        "A transformer model is a neural network that learns context and thus meaning by tracking relationships in sequential data like the words in this sentence. Transformer models apply an evolving set of mathematical techniques, called attention or self-attention, to detect subtle ways even distant data elements in a series influence and depend on each other.Transformers are translating text and speech in near real-time, opening meetings and classrooms to diverse and hearing-impaired attendees. They’re helping researchers understand the chains of genes in DNA and amino acids in proteins in ways that can speed drug design. Transformers can detect trends and anomalies to prevent fraud, streamline manufacturing, make online recommendations or improve healthcare. People use transformers every time they search on Google or Microsoft Bing or Yandex.",
      reference:
        "https://blogs.nvidia.com/blog/2022/03/25/what-is-a-transformer-model/",
    },
    {
      header: "What is BERT ?",
      content:
        "BERT, short for Bidirectional Encoder Representations from Transformers, is a Machine Learning (ML) model for natural language processing. It was developed in 2018 by researchers at Google AI Language and serves as a swiss army knife solution to 11+ of the most common language tasks, such as sentiment analysis and named entity recognition. anguage has historically been difficult for computers to ‘understand’. Sure, computers can collect, store, and read text inputs but they lack basic language context. So, along came Natural Language Processing (NLP): the field of artificial intelligence aiming for computers to read, analyze, interpret and derive meaning from text and spoken words. This practice combines linguistics, statistics, and Machine Learning to assist computers in ‘understanding’ human language.BERT revolutionized the NLP space by solving the most common NLP tasks.",
      reference: "https://huggingface.co/blog/bert-101#1-what-is-bert-used-for",
    },
  ];

  return (
    <div className="flex flex-wrap gap-y-10 h-fit bg-GREEN_MAIN py-10 m-5 rounded-lg ">
      {INFORMATION_CONTAINER_DATA.map((data) => (
        <InformationContainer
          key={data.header}
          header={data.header}
          content={data.content}
          reference={data.reference}
        />
      ))}
    </div>
  );
}

export default DefinitionsContainer;
