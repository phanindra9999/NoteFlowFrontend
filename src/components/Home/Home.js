import React, { useState } from 'react';
import notesData from '../../Notes.json';
import './Home.css';
import NoteCard from '../NoteCard/NoteCard';
import AddNoteForm from '../AddNoteForm/AddNoteForm';

const Home = () => {
    const [selectedNote, setSelectedNote] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [isAddingNote, setIsAddingNote] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);  // State to control the popup

    const filteredNotes = notesData.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedNotes = filteredNotes.sort((a, b) => {
        if (sortOrder === 'asc') {
            return new Date(a.uploadDate) - new Date(b.uploadDate);
        } else {
            return new Date(b.uploadDate) - new Date(a.uploadDate);
        }
    });

    const handleNoteClick = (note, event) => {
        event.stopPropagation(); // Prevent event propagation
        setSelectedNote(note);
        setIsPopupOpen(true);  // Open the popup
    };

    const handleSortChange = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleAddNote = () => {
        setIsAddingNote(!isAddingNote); // Toggle the state
    };

    const handleCloseAddNote = () => {
        setIsAddingNote(false);
    };

    return (
        <div className="home-container">
            <h1>My Notes</h1>
            <div className="actions">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button className="sort-button" onClick={handleSortChange}>
                    Sort by Date {sortOrder === 'asc' ? '↓' : '↑'}
                </button>
            </div>
            <div className="notes-list">
                {sortedNotes.slice(0, 8).map((note, index) => (
                    <div key={index} className="note-item" onClick={(e) => handleNoteClick(note, e)}>
                        <h3>{note.title}</h3>
                        <p className="note-description">{note.description.length > 100 ? `${note.description.slice(0, 100)}...` : note.description}</p>
                        {note.image_link && <img src={note.image_link} alt="Note Media" className="note-media" />}
                        {note.video_link && <video controls src={note.video_link} className="note-media" />}
                    </div>
                ))}
            </div>
            {selectedNote && <NoteCard note={selectedNote} />}
            {isAddingNote && <AddNoteForm onClose={handleCloseAddNote} />}
            <button className="add-button" onDoubleClick={handleAddNote}>Add Note</button>
        </div>
    );
};

export default Home;
