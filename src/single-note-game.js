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
    width: 100%;
`;

const StyledPicker = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const StyledStreak = styled.div`
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
    min-height: 40px;
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
    const [streak, setStreak] = useState(0);
    const [feedback, setFeedback] = useState('');

    const onNoteClick = (note) => {
        if (note === currentNote.answer) {
            playNote(currentNote.note)

            const nextNote = pickNewNote(notes, currentNote);
            setAnswer(nextNote);

            const newStreak = streak + 1;
            setStreak(newStreak);
            if (newStreak % 5 === 0) {
                setFeedback(`Great job! ${newStreak} in a row!`);
            } else {
                setFeedback('');
            }
        } else {
            setStreak(0);
            setFeedback('');
        }
    }

    return <>
        <StyledScore
            clef={clef}
            keys={
                [currentNote.note]
            }
        />
        <StyledStreak>
            {feedback || `Streak: ${streak}`}
        </StyledStreak>
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