import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { Campaign } from "../../../types";

interface NewQuestDialogProps {
  open: boolean;
  createQuest: (campaignId: number, title: string, description: string) => Promise<void>;
  currentCampaign: Campaign;
  close: () => void;
}

const NewQuestDialog = ({ open, createQuest, currentCampaign, close }: NewQuestDialogProps) => {
  const [name, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreate = () => {
    if (!name.trim() || !content.trim()) {
      alert("Please fill in both fields.");
      return;
    }

    createQuest(currentCampaign.id, name, content);
    close();
    setTitle("");
    setContent("");
  };

  return (
    <Dialog open={open}>
      <DialogTitle>New Quest</DialogTitle>
      <DialogContent style={{ paddingTop: 16 }}>
        <TextField fullWidth margin="dense" label="Name" value={name} onChange={(e) => setTitle(e.target.value)} />
        <TextField fullWidth margin="dense" label="Description" multiline rows={4} value={content} onChange={(e) => setContent(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={handleCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewQuestDialog;
