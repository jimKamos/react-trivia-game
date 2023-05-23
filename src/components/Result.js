import React from 'react';

const Result = ({ score, totalQuestions, onPlayAgain }) => {
  return (
    <div>
      <h2>Quiz Result</h2>
      <p>Your Score: {score} / {totalQuestions}</p>
      <button type="button" onClick={onPlayAgain}>Play Again</button>
    </div>
  );
};

export default Result;
