import React, { useState } from 'react';
import Chance from 'chance';
import styled from 'styled-components';
import { Score } from './vex-flow'
import {basicNotes} from './notes';
import NoteButton from './note-button';
import useLocalStorage from "use-local-storage";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import * as Tone from 'tone';

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

const playNote = (note) => {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(`${note.replace('/', '')}`, "16n");
}

const SingleNoteGame = ({notes, clef}) => {
    const [currentNote, setAnswer] = useState(pickNewNote(notes));
    const [playSound, setPlaySound] = useLocalStorage("MC_PLAY_SOUND", false);

    const onNoteClick = (note) => {
        if(note === currentNote.answer) {
            if(playSound){
                playNote(currentNote.note)
            }

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
        <button style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            fontSize: '32px',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
        
        }} 
        onClick={() => setPlaySound((on) => !on)}
        >
            {playSound ? <FaVolumeUp/> : <FaVolumeMute/> }
        </button>
    </>
}

export default SingleNoteGame;