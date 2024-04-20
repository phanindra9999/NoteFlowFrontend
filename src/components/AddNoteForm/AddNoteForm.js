import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './AddNoteForm.css';

const AddNoteForm = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [mediaLink, setMediaLink] = useState('');
    const [mediaType, setMediaType] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('');
    const [mediaPreview, setMediaPreview] = useState(null);

    const handleAddNote = () => {
        const newNote = {
            title,
            description,
            image_link: mediaType === 'image' ? mediaLink : '',
            video_link: mediaType === 'video' ? mediaLink : '',
            backgroundColor,
            uploadDate: new Date().toISOString()
        };
        console.log(newNote);
        onClose();
    };

    const handleAddMedia = () => {
        if (isValidUrl(mediaLink)) {
            const type = mediaLink.includes('youtube') ? 'video' : 'image';
            setMediaType(type);
            if (type === 'image') {
                setMediaPreview(<img src={mediaLink} alt="Media" className="media-preview" />);
            } else {
                setMediaPreview(<video src={mediaLink} controls className="media-preview" />);
            }
        } else {
            alert('Invalid media link');
        }
    };

    const isValidUrl = (url) => {
        const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(url);
    };

    return (
        <div className="add-note-form">
            <h2>Add New Note</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="addnote-title"
            />
            <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                placeholder="Description"
                className="addnote-description"
            />
            <div className="addmedia-section">
                <input
                    type="text"
                    placeholder="Image/Video link"
                    value={mediaLink}
                    onChange={(e) => setMediaLink(e.target.value)}
                />
                <button className="add-media-button" onClick={handleAddMedia}>ADD</button>
                {mediaPreview}
            </div>
            <div className="addcolor-palette">
                <label>Background Color:</label>
                <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                />
            </div>
                <button className="addnote-button" onClick={handleAddNote}>Add Note</button>
                <button className="addclose-button" onClick={onClose}>Close</button>
        </div>
    );
};

export default AddNoteForm;
