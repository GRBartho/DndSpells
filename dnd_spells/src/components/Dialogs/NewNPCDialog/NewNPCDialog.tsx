import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { Campaign } from "../../../types";

interface NewNPCDialogProps {
  open: boolean;
  createNPC: (campaignId: number, title: string, description: string) => Promise<void>;
  currentCampaign: Campaign;
  close: () => void;
}

const NewNPCDialog = ({ open, createNPC, currentCampaign, close }: NewNPCDialogProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    if (!name.trim() || !description.trim()) {
      alert("Please fill in both fields.");
      return;
    }

    createNPC(currentCampaign.id, name, description);
    close();
    setName("");
    setDescription("");
  };

  return (
    <Dialog open={open}>
      <DialogTitle>New NPC</DialogTitle>
      <DialogContent style={{ paddingTop: 16 }}>
        <TextField fullWidth margin="dense" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField fullWidth margin="dense" label="Description" multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={handleCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewNPCDialog;
