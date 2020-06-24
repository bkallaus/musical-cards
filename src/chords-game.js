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

const SingleNoteGame = ({notes, clef}) => {
    const [currentNote, setAnswer] = useState(chance.d6());

    const onNoteClick = (note) => {
        if(note === currentNote.answer) {
            const nextNote = chance.d6()

            setAnswer(nextNote);
        }
    }
    
    return <>
        <StyledScore
            clef={clef}
            keys={['c/4', 'e/4', 'f/4']}
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