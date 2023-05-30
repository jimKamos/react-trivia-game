import React from "react";

const Result = ({ score, totalQuestions, onPlayAgain }) => {
  return (
    <div>
      <h2>Quiz Result</h2>
      <div className="card">
        <p>
          Your Score: {score} / {totalQuestions}
        </p>
        <button type="button" className="btn btn-primary mt-3" onClick={onPlayAgain}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Result;
