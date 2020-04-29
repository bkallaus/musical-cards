import React, { useState } from 'react';
import Chance from 'chance';

import { Score } from './vex-flow'
import { trebleNotes } from './notes';
import NotePicker from './note-picker';

const chance = new Chance();

const randomAnswer = () => chance.pickone(trebleNotes);
const SingleNoteGame = () => {
    const [currentNote, setAnswer] = useState(randomAnswer());

    const onNoteClick = (note) =>{
      if(note === currentNote.answer) {
          setAnswer(randomAnswer());
      }
    }
    
    return <>
        <Score
        height={'150px'}
        clef={'treble'}
        staves={[
            [currentNote.note]
        ]}
        />
        <NotePicker onNoteClick={onNoteClick}/>
    </>
}

export default SingleNoteGame;