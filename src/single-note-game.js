import React, { useState } from 'react';
import Chance from 'chance';
import styled from 'styled-components';

import { Score } from './vex-flow'
import NotePicker from './note-picker';

const StyledScore = styled(Score)`
    height: 150px;
    width: 100%;
`;

const SingleNoteGame = ({notes, clef}) => {
    const chance = new Chance();
    const [currentNote, setAnswer] = useState(chance.pickone(notes));

    const onNoteClick = (note) =>{
      if(note === currentNote.answer) {
          setAnswer(chance.pickone(notes));
      }
    }
    
    return <>
        <StyledScore
            clef={clef}
            staves={[
                [currentNote.note]
            ]}
        />
        <NotePicker onNoteClick={onNoteClick}/>
    </>
}

export default SingleNoteGame;