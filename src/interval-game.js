import React, { useState } from 'react';
import Chance from 'chance';
import styled from 'styled-components';

import { Score } from './vex-flow'
import NoteButton from './note-button';
import { Synth, now } from 'tone';
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
const distances = [1, 2, 3, 4, 5, 6, 7, 8];

const synth = new Synth({
    oscillator: { type: "triangle" },
    envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.3,
        release: 1,
    },
}).toDestination();

const playChord = (low, high) => {
    const start = now()
    synth.triggerAttackRelease(`${low.replace('/', '')}`, "8n", start);
    synth.triggerAttackRelease(`${high.replace('/', '')}`, "8n", start + .01);
}

const IntervalGame = ({ notes, clef }) => {
    const [distance, setAnswer] = useState(chance.d8());
    const [streak, setStreak] = useState(0);
    const [feedback, setFeedback] = useState('');
    const start = chance.d4();

    const onNoteClick = (note) => {
        if (note === distance) {
            playChord(notes[start].note, notes[distance + start].note)

            const nextNote = chance.d8()
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
            keys={[notes[start].note, notes[distance + start].note]}
        />
        <StyledStreak>
            {feedback || `Streak: ${streak}`}
        </StyledStreak>
        {<StyledPicker>
            {distances.map((note) =>
                <NoteButton
                    key={note}
                    currentNote={({ answer: distance })}
                    note={note}
                    onNoteClick={onNoteClick} />
            )}
        </StyledPicker>}
        <VolumeControl />
    </>
}

export default IntervalGame;