import React, { useState, useEffect } from 'react';
import axios from 'axios';
import he from 'he';

import CategorySelect from './components/CategorySelect';
import DifficultySelect from './components/DifficultySelect';
import Question from './components/Question';
import Result from './components/Result';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api.php', {
          params: {
            amount: 5, // Number of questions to fetch
            category: selectedCategory,
            difficulty: selectedDifficulty,
            type: 'multiple',
          },
        });

        const data = response.data.results.map((question) => ({
          ...question,
          question: he.decode(question.question),
          correct_answer: he.decode(question.correct_answer),
          incorrect_answers: question.incorrect_answers.map((answer) =>
            he.decode(answer)
          ),
        }));

        setQuestions(data);
        console.log(response.data)
      } catch (error) {
        console.log('Error fetching questions:', error);
      }
    };

    if (quizStarted) {
      fetchQuestions();
    }
  }, [quizStarted, selectedCategory, selectedDifficulty]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const handleAnswerSelect = (choice) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (choice === currentQuestion.correct_answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex === questions.length - 1) {
      setQuizStarted(false);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePlayAgain = () => {
    setSelectedCategory('');
    setSelectedDifficulty('');
    setQuizStarted(false);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  if (!quizStarted && questions.length === 0) {
    return (
      <div className="App">
        <h1>Trivia Game</h1>
        <CategorySelect onSelectCategory={handleCategorySelect} />
        <DifficultySelect onSelectDifficulty={handleDifficultySelect} />
        <button type="button" onClick={handleStartQuiz}>
          Start Quiz
        </button>
      </div>
    );
  }

  if (quizStarted && questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (quizStarted) {
    return (
      <div className="App">
        <h1>Trivia Game</h1>
        <h2>Quiz question {currentQuestionIndex + 1}</h2>
        <Question
          question={currentQuestion.question}
          choices={currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer)}
          onSelectAnswer={handleAnswerSelect}
        />
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Trivia Game</h1>
      <Result
        score={score}
        totalQuestions={questions.length}
        onPlayAgain={handlePlayAgain}
      />
    </div>
  );
}

export default App;
