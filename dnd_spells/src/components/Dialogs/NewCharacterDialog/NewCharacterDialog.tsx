import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { Campaign, Character } from "../../../types";

interface NewCharacterDialogProps {
  open: boolean;
  createCharacter: (campaignId: number, character: Character) => Promise<void>;
  currentCampaign: Campaign;
  close: () => void;
}

const NewCharacterDialog = ({ open, createCharacter, currentCampaign, close }: NewCharacterDialogProps) => {
  const defaultCharacter = {
    id: -1,
    name: "",
    class: "",
    hp: 0,
    race: "",
    level: 1,
    description: "",
  };
  const [character, setCharacter] = useState<Character>(defaultCharacter);

  const handleCreate = () => {
    const { name, class: charClass, hp, race, level, description } = character;
    if (!name || !charClass || !race || hp <= 0 || level <= 0 || !description) {
      alert("Please fill in all character fields correctly.");
      return;
    }

    createCharacter(currentCampaign.id, character);
    close();
    setCharacter(defaultCharacter);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>New Character</DialogTitle>
      <DialogContent style={{ paddingTop: 16 }}>
        <TextField fullWidth margin="dense" label="Name" value={character.name} onChange={(e) => setCharacter((char) => ({ ...char, name: e.target.value }))} />
        <TextField fullWidth margin="dense" label="Class" value={character.class} onChange={(e) => setCharacter((char) => ({ ...char, class: e.target.value }))} />
        <TextField fullWidth margin="dense" label="Race" value={character.race} onChange={(e) => setCharacter((char) => ({ ...char, race: e.target.value }))} />
        <TextField fullWidth margin="dense" label="HP" type="number" value={character.hp} onChange={(e) => setCharacter((char) => ({ ...char, hp: parseInt(e.target.value) }))} />
        <TextField fullWidth margin="dense" label="Level" type="number" value={character.level} onChange={(e) => setCharacter((char) => ({ ...char, level: parseInt(e.target.value) }))} />
        <TextField fullWidth margin="dense" label="Description" multiline rows={4} value={character.description} onChange={(e) => setCharacter((char) => ({ ...char, description: e.target.value }))} />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={handleCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewCharacterDialog;
