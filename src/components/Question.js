import React from 'react';

const Question = ({ question, choices, onSelectAnswer }) => {
  const handleAnswerSelect = (choice) => {
    onSelectAnswer(choice);
  };

  return (
    <div>
      <h2>{question}</h2>
      <ul>
        {choices.map((choice, index) => (
          <li key={index} onClick={() => handleAnswerSelect(choice)}>
            {choice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
