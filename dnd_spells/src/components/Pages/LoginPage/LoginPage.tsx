import { Typography, TextField, Button } from "@mui/material";
import { useStyles } from "./LoginPageStyles";

interface LoginPageProps {
  setCurrentTypedUser: React.Dispatch<React.SetStateAction<{ username: string; password: string }>>;
  findUser: () => void;
}

const LoginPage = ({ setCurrentTypedUser, findUser }: LoginPageProps) => {
  const classes = useStyles();
  return (
    <div className={classes.loginContainer}>
      <Typography className={classes.welcomeText} variant="h1">
        Welcome to the Campaign Manager
      </Typography>
      <TextField label="Username" variant="outlined" onChange={(e) => setCurrentTypedUser((user) => ({ ...user, username: e.target.value }))} />
      <TextField label="Password" variant="outlined" type="password" onChange={(e) => setCurrentTypedUser((user) => ({ ...user, password: e.target.value }))} />
      <Button variant="contained" onClick={() => findUser()} color="primary">
        Login
      </Button>
    </div>
  );
};

export default LoginPage;
