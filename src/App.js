import React, {useState} from 'react';
import styled from 'styled-components';
import SingleNoteGame from './single-note-game';
import { trebleNotes, bassNotes } from './notes';

const StyledApp = styled.div`
    padding-top: 24px;
    text-align: center;
`;

const StyledGameButton = styled.button`
    border: 1px solid black;
    border-radius: 8px;
    background: white;
    display: inline-block;
    font-size: 20px;
    padding: 16px 48px;
    text-decoration: none;
    margin: 4px;
    text-align: center;

    :active {
        background: #ccc;
    }
`;

function App() {
  const [gameId, setGameId] = useState(0);

  return (
    <StyledApp className="App">
      <div>
        <StyledGameButton onClick={() => setGameId(0)}>{'Treble'}</StyledGameButton>
        <StyledGameButton onClick={() => setGameId(1)}>{'Bass'}</StyledGameButton>
      </div>
      {!gameId && <SingleNoteGame clef={'treble'} notes={trebleNotes} />}
      {gameId === 1 && <SingleNoteGame clef={'bass'} notes={bassNotes} />}
    </StyledApp>
  );
}

export default App;
