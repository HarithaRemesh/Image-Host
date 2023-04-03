import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Container, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)",
  },
  formField: {
    marginBottom: theme.spacing(2),
    marginTop : theme.spacing(2)
  },
  button: {
    marginTop: theme.spacing(3),
  },
}));

function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  const handleLogin = (e) => {
    e.preventDefault();
    logInWithEmailAndPassword(email, password);
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <form className={classes.form} onSubmit={handleLogin}>
          <Typography variant="h4" component="h2" gutterBottom>
            Login
          </Typography>
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            className={classes.formField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            className={classes.formField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
            fullWidth
          >
            Login
          </Button>
          <Typography variant="body1" component="div" align="center" className={classes.formField}>
            Don't have an account? <Link to="/register">Register</Link> now.
          </Typography>
        </form>
      </Container>
    </div>
  );
}

export default Login;
