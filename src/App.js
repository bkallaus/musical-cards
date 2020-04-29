import React from 'react';
import styled from 'styled-components';
import SingleNoteGame from './single-note-game';

const StyledApp = styled.div`
    padding-top: 24px;
    text-align: center;
`;

function App() {

  return (
    <StyledApp className="App">
      <SingleNoteGame />
    </StyledApp>
  );
}

export default App;
