import { Button, Typography } from "@mui/material";
import { NPC } from "../../types";
import { useStyles } from "./NPCCardStyles";
import { useState } from "react";

interface NPCCardProps {
  npc: NPC;
  deleteNPC: (npcId: number) => void;
}
const NPCCard = ({ npc, deleteNPC }: NPCCardProps) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={classes.NPCCard} onClick={() => setIsOpen(!isOpen)}>
      <Typography variant="h3">{npc.name}</Typography>
      {isOpen && (
        <div>
          <Typography>{npc.description}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              deleteNPC(npc.id);
            }}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};
export default NPCCard;
