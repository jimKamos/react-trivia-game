import React, { useState } from "react";
import CategorySelect from "./components/CategorySelect";
import DifficultySelect from "./components/DifficultySelect";
import Quiz from "./components/Quiz";
import Result from "./components/Result";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleQuizComplete = (score) => {
    setQuizScore(score);
    setQuizStarted(false);
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handlePlayAgain = () => {
    setSelectedCategory("");
    setSelectedDifficulty("");
    setQuizStarted(false);
    setQuizScore(0);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="container text-center">
          <h1 className="display-4">Trivia Game</h1>
        </div>
        {!quizStarted && !quizScore ? (
          <div className="row justify-content-center">
            <div className="col-md-7">
              <CategorySelect onSelectCategory={handleCategorySelect} />
              <DifficultySelect onSelectDifficulty={handleDifficultySelect} />
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-primary mt-3 w-25"
                  onClick={handleStartQuiz}
                >
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {quizStarted && (
              <Quiz
                category={selectedCategory}
                difficulty={selectedDifficulty}
                onQuizComplete={handleQuizComplete}
              />
            )}
            {quizScore > 0 && (
              <Result
                score={quizScore}
                totalQuestions={5} // Set the total number of questions here
                onPlayAgain={handlePlayAgain}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
