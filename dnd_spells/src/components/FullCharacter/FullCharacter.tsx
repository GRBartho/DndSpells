import { Button, Typography } from "@mui/material";
import { Character } from "../../types";
import SpellCard from "./SpellCard";
import { useStyles } from "./FullCharacterStyles";

interface FullCharacterProps {
  character: Character;
  exit: () => void;
  deleteCharacter: (characterId: number) => void;
  deleteSpell: (spellId: number) => void;
  addNewSpell: () => void;
}

const FullCharacter = ({ character, exit, deleteCharacter, deleteSpell, addNewSpell }: FullCharacterProps) => {
  const classes = useStyles();
  return (
    <div className={classes.fullCharacter}>
      <Button className={classes.backButton} onClick={exit} variant="contained" color="primary">
        Back
      </Button>
      <div className={classes.top}>
        <div className={classes.topLeft}>
          <Typography variant="h2">{character.name}</Typography>
          <Typography variant="h3">
            Level {character.level} {character.class} {character.race}
          </Typography>
        </div>
        <div className={classes.topRight}>
          <Typography variant="h2">
            HP: {character.hp}/{character.hp}
          </Typography>
        </div>
      </div>

      {character.spells.length > 0 && (
        <div className={classes.spells}>
          <Typography variant="h2">Spells:</Typography>
          <div className={classes.spellList}>
            {character.spells.map((spell) => (
              <SpellCard deleteSpell={deleteSpell} spell={spell} />
            ))}
            <div onClick={() => addNewSpell()} className={classes.addNew}>
              <Typography>Add new Spell</Typography>
            </div>
          </div>
        </div>
      )}
      <Button
        onClick={() => {
          if (window.confirm("Are you sure you want to delete this character?")) {
            deleteCharacter(character.id);
          }
        }}
        variant="contained"
        color="primary"
      >
        Delete Character
      </Button>
    </div>
  );
};
export default FullCharacter;
