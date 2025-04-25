import { Button, Typography } from "@mui/material";
import { Character } from "../../types";
import { useStyles } from "./FullCharacterStyles";

interface FullCharacterProps {
  character: Character;
  exit: () => void;
  deleteCharacter: (characterId: number) => void;
}

const FullCharacter = ({ character, exit, deleteCharacter }: FullCharacterProps) => {
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
      <div className={classes.spells}>
        <Typography variant="h3">Description</Typography>
        <Typography variant="body1">{character.description}</Typography>
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
    </div>
  );
};
export default FullCharacter;
