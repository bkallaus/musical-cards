import React from 'react';
import styled from 'styled-components'

const StyledNoteButton = styled.button`
    border: 1px solid black;
    border-radius: 8px;
    background: white;
    display: inline-block;
    font-size: 20px;
    padding: 24px 40px;
    text-decoration: none;
    margin: 4px;
    text-align: center;

    :active {
        background: grey;
    }
`;

const NoteButton = ({note, onNoteClick}) => {
    return <StyledNoteButton onClick={() => onNoteClick(note)}>
        {note}
    </StyledNoteButton>
}


export default NoteButton;