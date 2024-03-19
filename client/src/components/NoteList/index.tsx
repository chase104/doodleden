import { useContext, useEffect } from "react";
import { searchContext } from "../../contexts";
import Note from "../Note";

const NoteList = () => {
  const { notes, setNotes, searchTerm } = useContext(searchContext);

  useEffect(() => {
    const localNotes = localStorage.getItem("notes");
    if (localNotes) {
      setNotes(JSON.parse(localNotes));
    }
  }, [setNotes]);

  const filteredNotes = notes.filter((note) => {
    return (
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container">
      {filteredNotes.map((note, index) => (
        <Note key={note.id} note={note} index={index} />
      ))}
    </div>
  );
};

export default NoteList;
