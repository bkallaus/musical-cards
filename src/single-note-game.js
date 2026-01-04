import React, { useState } from 'react';
import Chance from 'chance';
import styled from 'styled-components';
import { Score } from './vex-flow'
import { basicNotes } from './notes';
import NoteButton from './note-button';
import { Synth } from 'tone';
import VolumeControl from './volume-control';

const StyledScore = styled(Score)`
    height: 150px;
    max-width: 800px;
    margin: 0 auto;

    @media (max-width: 768px) { 
        margin: 20px;
    }
`;

const StyledPicker = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const chance = new Chance();

const pickNewNote = (notes, currentNote = {}) => {
    let nextNote = chance.pickone(notes);

    while (nextNote.answer === currentNote.answer) {
        nextNote = chance.pickone(notes);
    }

    return nextNote;
};

const synth = new Synth({
    oscillator: { type: "sine" },
    envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.3,
        release: 1,
    },
}).toDestination();

const playNote = (note) => {
    synth.triggerAttackRelease(`${note.replace('/', '')}`, "8n");
}

const SingleNoteGame = ({ notes, clef }) => {
    const [currentNote, setAnswer] = useState(pickNewNote(notes));

    const onNoteClick = (note) => {
        if (note === currentNote.answer) {
            playNote(currentNote.note)

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
        <VolumeControl />
    </>
}

export default SingleNoteGame;