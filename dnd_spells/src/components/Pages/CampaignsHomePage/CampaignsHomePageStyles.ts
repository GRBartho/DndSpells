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
  characterContainer: {
    display: "flex",
    flexDirection: "row",
    gap: theme.spacing(1),
    borderRadius: theme.spacing(1),
    paddingTop: theme.spacing(2),
    width: "100%",
    flexWrap: "wrap",
  },
  outerCharacterContainer: {
    width: "100%",
  },
  campaignCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.palette.background.paper,
    cursor: "pointer",
    maxWidth: 912,
    borderRadius: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: "100%",
  },
  campaignContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: theme.spacing(2),
  },

  mainContainer: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingTop: "178px",
  },
  logoutButton: {
    maxWidth: 60,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    boxSizing: "border-box",
  },
  buttonsDiv: {
    gap: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  categoryButton: {
    borderRadius: 50,
  },
  notesContainer: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    width: "100%",
  },
  questsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    width: "100%",
  },
  campaignDetailsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    paddingTop: theme.spacing(2),
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  campaignDetails: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(2),
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
  },
}));
