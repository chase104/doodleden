import React, { useContext, useState } from "react";
import { NoteType, searchContext } from "../../contexts";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./index.css";
interface NoteProps {
  note: NoteType;
  index: number;
}

const Note: React.FC<NoteProps> = ({ note, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(note);
  const { setNotes, notes } = useContext(searchContext);
  const handleDelete = () => {
    const newNotes = notes.filter((n) => n.id !== note.id);
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedNote({
      ...editedNote,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsEditing(false);
    const newNotes = notes.map((n) => {
      if (n.id === note.id) {
        return editedNote;
      }
      return n;
    });
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
  };
  return (
    <div>
      {isEditing ? (
        <Form
          className={`d-flex align-items-center p-3 ${
            index % 2 === 0 ? "bg-light-grey " : ""
          }`}
          onSubmit={handleEditSubmit}
        >
          <div className="btn-group">
            <Button variant="secondary" onClick={handleEditToggle}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </div>

          <div className="text-start ps-4 w-100">
            <Form.Control
              type="text"
              value={editedNote.title}
              name="title"
              onChange={handleEditChange}
              className="input-as-h3 mw-25"
            />
            <Form.Control
              as="textarea"
              name="body"
              value={editedNote.body}
              onChange={handleEditChange}
              rows={4}
            />
          </div>
        </Form>
      ) : (
        <div
          className={`d-flex align-items-center p-3 ${
            index % 2 === 0 ? "bg-light-grey " : ""
          }`}
        >
          <div className="btn-group">
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="info" onClick={handleEditToggle}>
              Edit
            </Button>
          </div>
          <div className="text-start ps-4">
            <h3>{note.title}</h3>
            <div className="text-wrap-class ms-3">{note.body}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;
