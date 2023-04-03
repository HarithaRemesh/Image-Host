import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../Firebase/firebase";
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
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(3),
  },
}));

function Register() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Please enter name");
      return;
    }
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <form className={classes.form} onSubmit={handleRegister}>
          <Typography variant="h4" component="h2" gutterBottom>
            Register
          </Typography>
          <TextField
            id="name"
            label="Full Name"
            type="text"
            variant="outlined"
            fullWidth
            className={classes.formField}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"
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
            pattern="^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).{8,}$"
            helperText = "Password must be atleast 8 Characters"
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
            fullWidth
          >
            Register
          </Button>
          <Typography variant="body1" component="div" align="center" className={classes.formField}>
            Already have an account? <Link to="/">Login</Link> now.
          </Typography>
        </form>
      </Container>
    </div>
  );
}

export default Register;