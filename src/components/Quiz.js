import React, { useState, useEffect } from "react";
import axios from "axios";
import he from "he";

import Question from "./Question";

const Quiz = ({ category, difficulty, onQuizComplete }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("https://opentdb.com/api.php", {
          params: {
            amount: 5, // Number of questions to fetch
            category: category,
            difficulty: difficulty,
            type: "multiple",
          },
        });

        const data = response.data.results.map((question) => ({
          ...question,
          question: he.decode(question.question),
          correct_answer: he.decode(question.correct_answer),
          incorrect_answers: question.incorrect_answers.map((answer) => he.decode(answer)),
        }));

        setQuestions(data);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [category, difficulty]);

  const handleAnswerSelect = (choice) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (choice === currentQuestion.correct_answer) {
      setScore(score + 1);
      console.log(score);
    }

    if (currentQuestionIndex === questions.length - 1) {
      onQuizComplete(score + 1);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h2>Quiz</h2>
      <Question
        question={currentQuestion.question}
        choices={currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer)}
        onSelectAnswer={handleAnswerSelect}
      />
    </div>
  );
};

export default Quiz;
