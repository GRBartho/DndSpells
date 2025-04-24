import { Typography } from "@mui/material";
import { NPC } from "../../types";
import { useStyles } from "./NPCCardStyles";
import { useState } from "react";

interface NPCCardProps {
  npc: NPC;
  deleteNPC: (npcId: number) => void;
}
const NPCCard = ({ npc }: NPCCardProps) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={classes.NPCCard} onClick={() => setIsOpen(!isOpen)}>
      <Typography variant="h3">{npc.name}</Typography>
      {isOpen && <Typography>{npc.description}</Typography>}
    </div>
  );
};
export default NPCCard;
