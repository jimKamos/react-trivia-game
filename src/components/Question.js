import React from "react";

const Question = ({ question, choices, onSelectAnswer }) => {
  const handleAnswerSelect = (choice) => {
    onSelectAnswer(choice);
  };

  return (
    <div className="card">
      <h3 className="card__question">{question}</h3>
      <div className="card__answers my-3 w-75 mx-auto">
        {choices.map((choice, index) => (
          <span key={index} className="card__answer my-1" onClick={() => handleAnswerSelect(choice)}>
            {choice}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Question;
