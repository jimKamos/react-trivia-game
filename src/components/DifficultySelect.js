import React from 'react';

const DifficultySelect = ({ onSelectDifficulty }) => {
  const handleDifficultyChange = (event) => {
    const selectedDifficulty = event.target.value;
    onSelectDifficulty(selectedDifficulty);
  };

  return (
    <div>
      <h2>Select Difficulty</h2>
      <select onChange={handleDifficultyChange}>
        <option value="">Any Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
};

export default DifficultySelect;
