import React from 'react';

const DifficultySelect = ({ onSelectDifficulty }) => {
  const handleDifficultyChange = (event) => {
    const selectedDifficulty = event.target.value;
    onSelectDifficulty(selectedDifficulty);
  };

  return (
    <div className='form-group'>
      <label htmlFor="difficultySelect">Select Difficulty</label>
      <select className='form-select' id='difficultySelect' onChange={handleDifficultyChange}>
        <option value="">Any Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
};

export default DifficultySelect;
