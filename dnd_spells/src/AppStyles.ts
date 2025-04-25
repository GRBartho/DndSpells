import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  app: {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
    width: "100%",
  },
}));
