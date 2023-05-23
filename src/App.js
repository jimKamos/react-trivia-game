import React, { useState } from 'react';
import CategorySelect from './components/CategorySelect';
import DifficultySelect from './components/DifficultySelect';
import Quiz from './components/Quiz';
import Result from './components/Result';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
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
    setSelectedCategory('');
    setSelectedDifficulty('');
    setQuizStarted(false);
    setQuizScore(0);
  };

  return (
    <div className="App">
      <h1>Trivia Game</h1>
      {!quizStarted && !quizScore ? (
        <>
          <CategorySelect onSelectCategory={handleCategorySelect} />
          <DifficultySelect onSelectDifficulty={handleDifficultySelect} />
          <button type="button" onClick={handleStartQuiz}>
            Start Quiz
          </button>
        </>
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
  );
}

export default App;
