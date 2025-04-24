import { Typography } from "@mui/material";
import { Character } from "../../types";
import { useStyles } from "./CharacterCardStyles";

interface CharacterCardProps {
  character: Character;
  onClick?: () => void;
}

const CharacterCard = ({ character, onClick }: CharacterCardProps) => {
  const classes = useStyles();
  return (
    <div onClick={onClick} className={classes.characterCard}>
      <Typography variant="h2">{character.name}</Typography>
      <Typography variant="h3">
        {character.class}, {character.race}
      </Typography>
      <Typography variant="h4">
        HP: {character.hp} / {character.hp}
      </Typography>
    </div>
  );
};

export default CharacterCard;
