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
        background: ${(props) => props.color};
    }
`;

const NoteButton = ({note, onNoteClick, currentNote}) => {
    const color = currentNote.answer === note ? '#ADFF2F' : '#CCC';

    return <StyledNoteButton 
            color={color} 
            onClick={() => onNoteClick(note)}>
        {note}
    </StyledNoteButton>
}

export default NoteButton;