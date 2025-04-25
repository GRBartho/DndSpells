import { Typography, TextField, Button } from "@mui/material";
import { useStyles } from "./LoginPageStyles";
import { useState } from "react";

interface LoginPageProps {
  setCurrentTypedUser: React.Dispatch<React.SetStateAction<{ username: string; password: string }>>;
  findUser: (creatingUser: boolean) => void;
}

const LoginPage = ({ setCurrentTypedUser, findUser }: LoginPageProps) => {
  const classes = useStyles();
  const [creatingUser, setCreatingUser] = useState(false);
  return (
    <div className={classes.loginContainer}>
      <Typography className={classes.welcomeText} variant="h1">
        Welcome to the Campaign Manager
      </Typography>
      <TextField label="Username" variant="outlined" onChange={(e) => setCurrentTypedUser((user) => ({ ...user, username: e.target.value }))} />
      <TextField label="Password" variant="outlined" type="password" onChange={(e) => setCurrentTypedUser((user) => ({ ...user, password: e.target.value }))} />
      {creatingUser && <TextField label="Confirm Password" variant="outlined" type="password" onChange={(e) => setCurrentTypedUser((user) => ({ ...user, password: e.target.value }))} />}
      <Button variant="contained" onClick={() => findUser(creatingUser)} color="primary">
        {creatingUser ? "Create User" : "Login"}
      </Button>
      <Typography onClick={() => setCreatingUser(!creatingUser)} className={classes.createUserText} variant="h3">
        {!creatingUser ? "Create a new user" : "Login to your account"}
      </Typography>
    </div>
  );
};

export default LoginPage;
