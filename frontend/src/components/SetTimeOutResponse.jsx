import React from "react";

const SetTimeOutResponse = (sentence1, sentence2) => {
  return (
    <>
      <span>{sentence1}</span>
      {setTimeout(() => {
        return <span> {sentence2}</span>;
      }, 1000)}
    </>
  );
};

export default SetTimeOutResponse;
