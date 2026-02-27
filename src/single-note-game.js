import React, { useState, useEffect } from 'react';
import Chance from 'chance';
import styled, { keyframes } from 'styled-components';
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

const pulse = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.5); }
    100% { transform: scale(1); }
`;

const StyledStreak = styled.div`
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
    min-height: 40px;
    animation: ${pulse} 0.2s linear;
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
    const [interactionId, setInteractionId] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setStreak(0);
            setFeedback(`Time's up! It was ${currentNote.answer.toUpperCase()}`);
            const nextNote = pickNewNote(notes, currentNote);
            setAnswer(nextNote);
        }, 10000);
        return () => clearTimeout(timer);
    }, [currentNote, notes, interactionId]);

    const onNoteClick = (note) => {
        setInteractionId(id => id + 1);
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
            setFeedback(`Wrong! It was ${currentNote.answer.toUpperCase()}`);
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
        <StyledStreak key={streak}>
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