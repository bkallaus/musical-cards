import React from 'react';

const noteButton = ({note, onNoteClick}) => {
    return <button onClick={() => onNoteClick(note)}>
        {note}
    </button>
}


export default noteButton;