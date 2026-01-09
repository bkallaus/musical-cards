import React, { useState } from 'react';
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

const StyledMessage = styled.div`
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
    min-height: 40px;
`;

const StyledButton = styled.button`
    border: 1px solid black;
    border-radius: 8px;
    background: white;
    display: inline-block;
    font-size: 20px;
    padding: 16px 48px;
    text-decoration: none;
    margin: 20px;
    text-align: center;
    cursor: pointer;

    :active {
        background: #ccc;
    }
`;


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

const song = [
  { answer: 'c', note: 'c/4' },
  { answer: 'c', note: 'c/4' },
  { answer: 'g', note: 'g/4' },
  { answer: 'g', note: 'g/4' },
  { answer: 'a', note: 'a/4' },
  { answer: 'a', note: 'a/4' },
  { answer: 'g', note: 'g/4' },

  { answer: 'f', note: 'f/4' },
  { answer: 'f', note: 'f/4' },
  { answer: 'e', note: 'e/4' },
  { answer: 'e', note: 'e/4' },
  { answer: 'd', note: 'd/4' },
  { answer: 'd', note: 'd/4' },
  { answer: 'c', note: 'c/4' },
];

const SongGame = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const onNoteClick = (note) => {
        if (isFinished) return;

        const currentNote = song[currentIndex];

        if (note === currentNote.answer) {
            playNote(currentNote.note);

            if (currentIndex + 1 >= song.length) {
                setIsFinished(true);
            } else {
                setCurrentIndex(currentIndex + 1);
            }
        }
    }

    const restart = () => {
        setCurrentIndex(0);
        setIsFinished(false);
    }

    const currentNote = song[currentIndex];

    return <>
        {!isFinished ? (
             <StyledScore
                clef={'treble'}
                keys={[currentNote.note]}
            />
        ) : (
            <div style={{height: '150px'}} />
        )}

        <StyledMessage>
            {isFinished ? "Song Complete!" : "Play the note shown above"}
        </StyledMessage>

        {!isFinished && (
            <StyledPicker>
                {basicNotes.map((note) =>
                    <NoteButton
                        key={note}
                        note={note}
                        currentNote={currentNote}
                        onNoteClick={onNoteClick}
                        />
                )}
            </StyledPicker>
        )}

        {isFinished && (
            <div style={{textAlign: 'center'}}>
                <StyledButton onClick={restart}>Play Again</StyledButton>
            </div>
        )}

        <VolumeControl />
    </>
}

export default SongGame;
