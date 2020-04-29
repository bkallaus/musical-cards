import React, { useState } from 'react';
import Chance from 'chance';
import { Score } from './vex-flow'
import './App.css';

import { trebleNotes } from './notes';
import NotePicker from './note-picker';


const chance = new Chance();

const randomAnswer = () => chance.pickone(trebleNotes);

function App() {
  const [currentNote, setAnswer] = useState(randomAnswer());
  const onNoteClick =(note) =>{

    if(note === currentNote.answer) {
        setAnswer(randomAnswer());
    }
  }

  return (
    <div className="App">
      <Score
        height={'150px'}
        clef={'treble'}
        staves={[
          [currentNote.note]
        ]}
      />
      <NotePicker onNoteClick={onNoteClick}/>
    </div>
  );
}

export default App;
