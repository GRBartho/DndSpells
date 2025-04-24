import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  spellList: {
    gap: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  },
  spells: {
    display: "flex",
    flexDirection: "column",
    borderRadius: theme.spacing(1),
    cursor: "pointer",
    gap: theme.spacing(1),
  },
  topRight: {
    display: "flex",
    flexDirection: "column",
  },
  topLeft: {
    display: "flex",
    flexDirection: "column",
  },
  top: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fullCharacter: {
    gap: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  },
  backButton: {
    maxWidth: 64,
  },
  addNew: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    fontSize: "1.5rem",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    textAlign: "center",
  },
}));
