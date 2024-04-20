import React, { useState } from 'react';
import notesData from '../../Notes.json';
import './AllNotes.css';

const AllNotes = () => {
    const [selectedNote, setSelectedNote] = useState(null);

    const handleNoteClick = (note) => {
        setSelectedNote(note);
    };

    const handleClose = () => {
        setSelectedNote(null);
    };

    return (
        <div className="all-notes-container">
            <h1>All Notes</h1>
            <div className="notes-list">
                {notesData.map((note, index) => (
                    <div key={index} className="note-card" onClick={() => handleNoteClick(note)}>
                        <h3>{note.title}</h3>
                        <p className="note-description">{note.description.length > 100 ? `${note.description.slice(0, 100)}...` : note.description}</p>
                        {note.image_link && <img src={note.image_link} alt="Note Media" className="note-media" />}
                        {note.video_link && <video controls src={note.video_link} className="note-media" />}
                    </div>
                ))}
            </div>

            {selectedNote && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>{selectedNote.title}</h2>
                        <p>{selectedNote.description}</p>
                        <button className="close-button" onClick={handleClose}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllNotes;
