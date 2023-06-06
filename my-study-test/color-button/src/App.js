import React, { useState } from 'react';

function App() {
  const [color, setColor] = useState('red');

  const onClickButton = () => {
    const newColor = color === 'red' ? 'blue' : 'red';
    setColor(newColor);
  };

  return (
    <div>
      <button style={{ backgroundColor: color }} onClick={onClickButton}>
        Change to {color === 'red' ? 'blue' : 'red'}
      </button>
    </div>
  );
}

export default App;
