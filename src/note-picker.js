import React from 'react';
import NoteButton from './note-button';
import {basicNotes} from './notes';
import styled from 'styled-components'

const StyledPicker = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const notePicker = ({onNoteClick}) => {
    return <StyledPicker>
        {basicNotes.map((note) => <NoteButton key={note} note={note} onNoteClick={onNoteClick} />)}
    </StyledPicker>

};

export default notePicker;