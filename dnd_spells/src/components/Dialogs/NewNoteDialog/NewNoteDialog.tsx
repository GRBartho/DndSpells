import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { Campaign } from "../../../types";

interface NewNoteDialogProps {
  open: boolean;
  createNote: (campaignId: number, title: string, description: string) => Promise<void>;
  currentCampaign: Campaign;
  close: () => void;
}

const NewNoteDialog = ({ open, createNote, currentCampaign, close }: NewNoteDialogProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreate = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill in both fields.");
      return;
    }

    createNote(currentCampaign.id, title, content);
    close();
    setTitle("");
    setContent("");
  };

  return (
    <Dialog open={open}>
      <DialogTitle>New Note</DialogTitle>
      <DialogContent style={{ paddingTop: 16 }}>
        <TextField fullWidth margin="dense" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField fullWidth margin="dense" label="Description" multiline rows={4} value={content} onChange={(e) => setContent(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={handleCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewNoteDialog;
