import { useState } from "react";
import { Spell } from "../../types";
import { Button, Typography } from "@mui/material";
import { useStyles } from "./SpellCardStyles";

interface SpellCardProps {
  spell: Spell;
  deleteSpell: (spellId: number) => void;
}
const SpellCard = ({ spell, deleteSpell }: SpellCardProps) => {
  const [spellIsOpen, setSpellIsOpen] = useState(false);
  const classes = useStyles();
  return (
    <div className={classes.SpellCard} onClick={() => setSpellIsOpen(!spellIsOpen)} key={spell.id}>
      <div className={classes.spellTitle}>
        <Typography variant="h3">{spell.name}</Typography>
        <Button onClick={() => deleteSpell(spell.id)} variant="contained" color="primary">
          Delete
        </Button>
      </div>
      {spellIsOpen && <Typography>{spell.description}</Typography>}
    </div>
  );
};
export default SpellCard;
