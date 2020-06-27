import React, { useState } from 'react';
import Chance from 'chance';
import styled from 'styled-components';

import { Score } from './vex-flow'
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
const distances = [1,2,3,4,5,6,7,8];

const SingleNoteGame = ({notes, clef}) => {
    const [distance, setAnswer] = useState(chance.d8());
    const start = chance.d4();
    const onNoteClick = (note) => {
        if(note === distance) {
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
    </>
}

export default SingleNoteGame;