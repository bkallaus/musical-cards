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

    transition: background 1s cubic-bezier(0.25, 0.8, 0.25, 1);

    &:active {
        background: ${(props) => props.color};
        transition: background 0s;
    }
`;

const NoteButton = ({ note, onNoteClick, currentNote }) => {
    const color = currentNote.answer === note ? '#ADFF2F' : '#CCC';

    return <StyledNoteButton
        color={color}
        onClick={() => onNoteClick(note)}>
        {note}
    </StyledNoteButton>
}

export default NoteButton;