import { Button, Typography } from "@mui/material";
import { Note } from "../../types";
import { useState } from "react";
import { useStyles } from "./NoteCardStyles";

interface NoteCardProps {
  note: Note;
  deleteNote: (noteId: number) => void;
}
const NoteCard = ({ note, deleteNote }: NoteCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();
  return (
    <div className={classes.noteCard} onClick={() => setIsOpen(!isOpen)}>
      <Typography variant="h3">{note.title}</Typography>
      {isOpen && (
        <div>
          <Typography>{note.content}</Typography>
          <Button onClick={() => deleteNote(note.id)} variant="contained" color="primary">
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};
export default NoteCard;
