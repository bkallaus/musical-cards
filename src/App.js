import React, {useState} from 'react';
import styled from 'styled-components';
import { trebleNotes, bassNotes } from './notes';
import SingleNoteGame from './single-note-game';
import IntervalGame from './interval-game';

const StyledApp = styled.div`
    padding-top: 24px;
    text-align: center;
`;

const StyledGameButton = styled.button`
    border: 1px solid black;
    border-radius: 8px;
    background: ${(props) => props.isActive ? '#e0e0e0': 'white'};
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
        <StyledGameButton isActive={!gameId} onClick={() => setGameId(0)}>{'Treble'}</StyledGameButton>
        <StyledGameButton isActive={gameId === 1} onClick={() => setGameId(1)}>{'Bass'}</StyledGameButton>
        <StyledGameButton isActive={gameId === 2} onClick={() => setGameId(2)}>{'Interval'}</StyledGameButton>
      </div>
      <h2>{'What note is this?'}</h2>
      {!gameId && <SingleNoteGame clef={'treble'} notes={trebleNotes} />}
      {gameId === 1 && <SingleNoteGame clef={'bass'} notes={bassNotes} />}
      {gameId === 2 && <IntervalGame clef={'treble'} notes={trebleNotes} />}
    </StyledApp>
  );
}

export default App;
