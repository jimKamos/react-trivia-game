import React from "react";

const Result = ({ score, totalQuestions, onPlayAgain }) => {
  return (
    <div>
      <h2>Quiz Result</h2>
      <div className="card p-4 mb-4">
        <h3 className="text-center">
          Your Score: {score} / {totalQuestions}
        </h3>
        <button type="button" className="btn btn-primary mt-3 w-75 mx-auto" onClick={onPlayAgain}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Result;
