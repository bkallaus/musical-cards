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
        background: grey;
    }
`;

const games = [
   <SingleNoteGame clef={'treble'} notes={trebleNotes} />,
   <SingleNoteGame clef={'bass'} notes={bassNotes}  />
  ];

function App() {
  const [gameId, setGameId] = useState(0);

  return (
    <StyledApp className="App">
      <div>
        <StyledGameButton onClick={() => setGameId(0)}>{'Treble'}</StyledGameButton>
        <StyledGameButton onClick={() => setGameId(1)}>{'Bass'}</StyledGameButton>
      </div>
      {games[gameId]}
    </StyledApp>
  );
}

export default App;
