import React, { useState } from 'react';
import Chance from 'chance';
import styled from 'styled-components';

import { Score } from './vex-flow'
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
const distances = [1,2,3,4,5,6,7,8];

const playChord = (low, high) => {
    const synth = new Tone.Synth().toDestination();

    const now = Tone.now()
    synth.triggerAttackRelease(`${low.replace('/', '')}`, "16n", now);
    synth.triggerAttackRelease(`${high.replace('/', '')}`, "16n",now + .01 );
}

const SingleNoteGame = ({notes, clef}) => {
    const [playSound, setPlaySound] = useLocalStorage("MC_PLAY_SOUND", false);
    const [distance, setAnswer] = useState(chance.d8());
    const start = chance.d4();

    const onNoteClick = (note) => {
        if(note === distance) {
            if(playSound){
                playChord(notes[start].note, notes[distance + start].note)
            }

            const nextNote = chance.d8()

            setAnswer(nextNote);
        }
    }
    
    return <>
        <StyledScore
            clef={clef}
            keys={[notes[start].note, notes[distance + start].note]}
        />
        {<StyledPicker>
            {distances.map((note) =>
                <NoteButton 
                key={note}
                currentNote={({answer: distance})} 
                note={note} 
                onNoteClick={onNoteClick} />
            )}
        </StyledPicker>}
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