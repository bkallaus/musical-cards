import React, { useState } from 'react';
import Chance from 'chance';

import { Score } from './vex-flow'
import NotePicker from './note-picker';

const SingleNoteGame = ({notes, clef}) => {
    const chance = new Chance();
    const [currentNote, setAnswer] = useState(chance.pickone(notes));

    const onNoteClick = (note) =>{
      if(note === currentNote.answer) {
          setAnswer(chance.pickone(notes));
      }
    }
    
    return <>
        <Score
        height={150}
        width={262}
        clef={clef}
        staves={[
            [currentNote.note]
        ]}
        />
        <NotePicker onNoteClick={onNoteClick}/>
    </>
}

export default SingleNoteGame;