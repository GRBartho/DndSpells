import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  noteCard: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(1),
    cursor: "pointer",
    padding: theme.spacing(2),
    gap: theme.spacing(1),
  },
}));
