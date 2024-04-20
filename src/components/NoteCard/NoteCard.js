import React, { useState } from 'react';
import notesData from '../../Notes.json'; // Import notesData
import './NoteCard.css';

const NoteCard = ({ note }) => {
    const [editTitle, setEditTitle] = useState(note.title);
    const [editDescription, setEditDescription] = useState(note.description);
    const [isEditing, setIsEditing] = useState(false);

    const handleClose = (e) => {
        e.preventDefault(); 
        setIsEditing(false);
    };

    const handleEditClose = () => {
        setIsEditing(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        const updatedNotes = notesData.map(n => {
            if (n.title === note.title) {
                return {
                    ...n,
                    title: editTitle,
                    description: editDescription
                };
            }
            return n;
        });

        // Update the original JSON data
        // This is a placeholder for actual updating of the JSON data
        // In a real-world scenario, you would send a request to update the data on your backend
        // For this example, we will just log the updated data to the console
        console.log(updatedNotes);

        setIsEditing(false);
    };

    const handleTitleChange = (e) => {
        setEditTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setEditDescription(e.target.value);
    };

    return (
        <div className="card-container">
            <div className="card">
                {isEditing ? (
                    <div className="card-header">
                        <button className="close-button" onClick={handleEditClose}>Close</button>
                    </div>
                ) : (
                    <div className="card-header">
                        <button className="close-button" onClick={handleClose}>Close</button>
                    </div>
                )}
                <div className="card-content" onClick={(e) => e.stopPropagation()}>
                    {isEditing ? (
                        <>
                            <input 
                                type="text" 
                                value={editTitle} 
                                onChange={handleTitleChange} 
                                className="card-title-input"
                            />
                            <textarea 
                                value={editDescription} 
                                onChange={handleDescriptionChange} 
                                className="card-description-textarea"
                            ></textarea>
                            <button className="save-button" onClick={handleSave}>Save</button>
                        </>
                    ) : (
                        <>
                            <h2 className="card-title">{note.title}</h2>
                            <p className="card-description">{note.description}</p>
                            <button className="edit-button" onClick={handleEdit}>Edit</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NoteCard;
