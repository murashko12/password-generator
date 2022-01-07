import { useState } from 'react';
import './App.css';

import Checkbox from './components/Checkbox';

function App() {
  const [checkedOne, setCheckedOne] = useState(false);
  const [checkedTwo, setCheckedTwo] = useState(false);
  const [checkedThree, setCheckedThree] = useState(false);
  const [checkedFour, setCheckedFour] = useState(false);
  const [handelText, setHandelText] = useState('');
  const [copied, setCopied] = useState(false);
  const [handelPasswordLen, setHandelPasswordLen] = useState(5);

  const handleChangeOne = () => {
    setCheckedOne(!checkedOne);
  };

  const handleChangeTwo = () => {
    setCheckedTwo(!checkedTwo);
  };

  const handleChangeThree = () => {
    setCheckedThree(!checkedThree);
  };

  const handleChangeFour = () => {
    setCheckedFour(!checkedFour);
  };

  function generatePassword() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];

    const characterCodes = Array.from(Array(26)).map((_e, i) => i + 97);
    const lowerCaseLetters = characterCodes.map((code) =>
      String.fromCharCode(code)
    );
    const upperCaseLetters = lowerCaseLetters.map((letter) =>
      letter.toUpperCase()
    );

    const generateTheWord = (
      length,
      hasNumbers,
      hasSymbols,
      hasLowercase,
      hasUppercase
    ) => {
      const availableCharacters = [
        ...(hasNumbers ? numbers : []),
        ...(hasSymbols ? symbols : []),
        ...(hasLowercase ? lowerCaseLetters : []),
        ...(hasUppercase ? upperCaseLetters : []),
      ];
      const shuffleArr = (array) => array.sort(() => Math.random() - 0.5);
      const characters = shuffleArr(availableCharacters).slice(0, length);
      setHandelText(characters.join(''));
      return characters;
    };

    generateTheWord(
      handelPasswordLen,
      checkedFour,
      checkedThree,
      checkedTwo,
      checkedOne
    );
  }

  return (
    <div className="App">
      <h2>Password Generator</h2>
      <div>
        <input
          type="text"
          value={handelText}
          placeholder=""
          autoComplete="off"
          onChange={(e) => setHandelText(e.target.value)}
        />
        <button
          className="btn"
          onClick={() => {
            if (handelText != null) {
              navigator.clipboard.writeText(handelText);
              setCopied(true);
              setInterval(() => {
                setCopied(false);
              }, 2500);
            }
          }}
        >
          {copied ? 'copied' : 'Copy'}
        </button>
      </div>
      <br />
      <div>
        <label>Password length</label>
        <input
          type="number"
          id="length"
          min="4"
          max="20"
          value={handelPasswordLen}
          onChange={(e) => setHandelPasswordLen(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label>Include uppercase letters</label>
        <Checkbox value={checkedOne} onChange={handleChangeOne} />
      </div>
      <br />
      <div>
        <label>Include lowercase letters</label>
        <Checkbox value={checkedTwo} onChange={handleChangeTwo} />
      </div>
      <br />
      <div>
        <label>Include numbers</label>
        <Checkbox value={checkedThree} onChange={handleChangeThree} />
      </div>
      <br />
      <div>
        <label>Include symbols</label>
        <Checkbox value={checkedFour} onChange={handleChangeFour} />
      </div>
      <br />
      <div>
        <button onClick={generatePassword}>Generate password</button>
      </div>
    </div>
  );
}

export default App;
