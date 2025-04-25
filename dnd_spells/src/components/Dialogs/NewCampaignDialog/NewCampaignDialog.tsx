import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Campaign } from "../../../types";

interface NewCampaignDialogProps {
  open: boolean;
  createCampaign: (campaign: Campaign) => void;
  currentUserId: number;
  close: () => void;
}

const NewCampaignDialog = ({ open, createCampaign, currentUserId, close }: NewCampaignDialogProps) => {
  const defaultCampaign = useMemo<Campaign>(
    () => ({
      id: -1, // will be removed before sending
      name: "",
      userId: currentUserId,
      system: "",
      players: [],
      quests: [],
      characters: [],
      npcs: [],
      notes: [],
    }),
    [currentUserId]
  );

  const [newCampaign, setNewCampaign] = useState<Campaign>(defaultCampaign);
  useEffect(() => {
    if (currentUserId !== null) {
      setNewCampaign(defaultCampaign);
    }
  }, [currentUserId, open, defaultCampaign]);

  return (
    <Dialog open={open}>
      <DialogTitle>New Campaign</DialogTitle>
      <DialogContent style={{ paddingTop: 16 }}>
        <TextField onChange={(e) => setNewCampaign((campaign) => ({ ...campaign, name: e.target.value }))} label="Name" />
        <TextField onChange={(e) => setNewCampaign((campaign) => ({ ...campaign, system: e.target.value }))} label="System" />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button
          onClick={() => {
            if (!newCampaign.name.trim() || !newCampaign.system.trim()) {
              alert("Please fill in both fields.");
              return;
            }
            createCampaign(newCampaign);
            close();
            setNewCampaign(defaultCampaign);
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default NewCampaignDialog;
