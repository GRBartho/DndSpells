import { Typography, TextField, Button } from "@mui/material";
import { useStyles } from "./LoginPageStyles";
import { useState } from "react";

interface LoginPageProps {
  currentTypedUser: { username: string; password: string };
  setCurrentTypedUser: (user: { username: string; password: string }) => void;
  findUser: (creatingUser: boolean) => void;
}

const LoginPage = ({ currentTypedUser, setCurrentTypedUser, findUser }: LoginPageProps) => {
  const classes = useStyles();
  const [creatingUser, setCreatingUser] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const createNewUser = () => {
    if (creatingUser && confirmPassword !== currentTypedUser.password) {
      alert("Passwords do not match");
      return;
    }
    findUser(creatingUser);
  };
  return (
    <div className={classes.loginContainer}>
      <Typography className={classes.welcomeText} variant="h1">
        Welcome to the Campaign Manager
      </Typography>
      <TextField label="Username" variant="outlined" onChange={(e) => setCurrentTypedUser({ ...currentTypedUser, username: e.target.value })} />
      <TextField label="Password" variant="outlined" type="password" onChange={(e) => setCurrentTypedUser({ ...currentTypedUser, password: e.target.value })} />
      {creatingUser && <TextField label="Confirm Password" variant="outlined" type="password" onChange={(e) => setConfirmPassword(e.target.value)} />}
      <Button variant="contained" onClick={() => createNewUser()} color="primary">
        {creatingUser ? "Create User" : "Login"}
      </Button>
      <Typography onClick={() => setCreatingUser(!creatingUser)} className={classes.createUserText} variant="h3">
        {!creatingUser ? "Create a new user" : "Login to your account"}
      </Typography>
    </div>
  );
};

export default LoginPage;
