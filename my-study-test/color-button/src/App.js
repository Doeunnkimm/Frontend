import React, { useState } from 'react';

function App() {
  const [color, setColor] = useState('red');
  const [isChecked, setIsChecked] = useState(false);
  const newColor = color === 'red' ? 'blue' : 'red';

  const onClickButton = () => {
    setColor(newColor);
  };

  const onChangeCheckbox = e => {
    setIsChecked(e.target.checked);
  };

  return (
    <div>
      <button
        style={{ backgroundColor: color }}
        onClick={onClickButton}
        disabled={isChecked}
      >
        Change to {newColor}
      </button>
      <input type="checkbox" onChange={onChangeCheckbox} />
    </div>
  );
}

export default App;
