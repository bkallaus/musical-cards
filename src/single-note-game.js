import React, { useState } from 'react';
import Chance from 'chance';
import styled from 'styled-components';

import { Score } from './vex-flow'
import {basicNotes} from './notes';
import NoteButton from './note-button';

const StyledScore = styled(Score)`
    height: 150px;
    width: 100%;
`;

const StyledPicker = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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
            keys={
                [currentNote.note]
            }
        />
        <StyledPicker>
            {basicNotes.map((note) =>
                <NoteButton 
                key={note}
                currentNote={currentNote} 
                note={note} 
                onNoteClick={onNoteClick} />
            )}
        </StyledPicker>
    </>
}

export default SingleNoteGame;