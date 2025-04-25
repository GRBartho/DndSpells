import { Button, Typography } from "@mui/material";
import { Quest } from "../../types";
import { useState } from "react";
import { useStyles } from "./QuestCardStyles";

interface QuestCardProps {
  quest: Quest;
  deleteFunction: (questId: number) => void;
}
const QuestCard = ({ quest, deleteFunction }: QuestCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();
  return (
    <div className={classes.questCard} onClick={() => setIsOpen(!isOpen)}>
      <Typography variant="h3">{quest.name}</Typography>
      {isOpen && (
        <div>
          <Typography>{quest.description}</Typography>
          <Button
            onClick={() => {
              deleteFunction(quest.id);
            }}
            variant="contained"
            color="primary"
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};
export default QuestCard;
