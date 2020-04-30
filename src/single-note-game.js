import React, { useState } from 'react';
import Chance from 'chance';
import styled from 'styled-components';

import { Score } from './vex-flow'
import NotePicker from './note-picker';

const StyledScore = styled(Score)`
    height: 150px;
    width: 100%;
`;

const chance = new Chance();

const pickNewNote = (notes, currentNote = {}) => {
    let nextNote = chance.pickone(notes);

    while(nextNote.answer === currentNote.answer){
        nextNote = chance.pickone(notes);
    }

    return nextNote;
};

const SingleNoteGame = ({notes, clef}) => {
    const [currentNote, setAnswer] = useState(pickNewNote(notes));

    const onNoteClick = (note) => {
      if(note === currentNote.answer) {
          const nextNote = pickNewNote(notes, currentNote);

          setAnswer(nextNote);
      }
    }
    
    return <>
        <StyledScore
            clef={clef}
            staves={[
                [currentNote.note]
            ]}
        />
        <NotePicker onNoteClick={onNoteClick} currentNote={currentNote}/>
    </>
}

export default SingleNoteGame;