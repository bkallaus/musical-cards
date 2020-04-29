import React from 'react';
import NoteButton from './note-button';
import {basicNotes} from './notes';

const notePicker = ({onNoteClick}) => {
    return <>
        {basicNotes.map((note) => <NoteButton key={note} note={note} onNoteClick={onNoteClick} />)}
    </>

};

export default notePicker;