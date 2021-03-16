import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../actions/user.js";
import { useSelector } from "react-redux";
import { createMuiTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textField: {
    "& .MuiFormLabel-root": {
      color: "white", // or black
    },
  },
  multilineColor: {
    color: "white",
  },
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.primary.main,
  },
}));
const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
/**
 * Adds user to database. Password is hashed on server.
 * @component
 * @memberof Auth
 */
const SignUp = () => {
  const classes = useStyles();
  const login_error = useSelector((state) => state.login_error);
  const dispatch = useDispatch();
  const [signUpInfo, setSignUpInfo] = useState(initialState);
  const onChange = (e) => {
    setSignUpInfo({ ...signUpInfo, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (signUpInfo.password !== signUpInfo.confirmPassword) {
      alert("The passwords you entered don't match.");
      return;
    }
    if (signUpInfo.password == "") {
      alert("The password fields cannot be blank. Please enter a password.");
      return;
    } else if (signUpInfo.password.length < 8) {
      alert(
        "Passwords must be at least 8 characters. Please enter a longer password."
      );
      return;
    }
    if (signUpInfo.name == "") {
      alert("The name field cannot be blank. Please enter a name.");
      return;
    }
    if (signUpInfo.email == "") {
      alert("The email field cannot be blank. Please enter an email.");
      return;
    }
    dispatch(createUser(signUpInfo));
  };
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                autoComplete="fname"
                name="name"
                variant="filled"
                required
                fullWidth
                id="firstName"
                label="Name"
                autoFocus
                color="primary"
                value={signUpInfo.name}
                onChange={onChange}
                InputProps={{
                  className: classes.multilineColor,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                variant="filled"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={signUpInfo.email}
                onChange={onChange}
                color="primary"
                InputProps={{
                  className: classes.multilineColor,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                variant="filled"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                color="primary"
                autoComplete="current-password"
                value={signUpInfo.password}
                onChange={onChange}
                InputProps={{
                  className: classes.multilineColor,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                variant="filled"
                required
                fullWidth
                name="confirmPassword"
                label="Re-enter Password"
                type="password"
                id="password"
                color="primary"
                autoComplete="current-password"
                value={signUpInfo.confirmPassword}
                onChange={onChange}
                InputProps={{
                  className: classes.multilineColor,
                }}
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          {login_error == "User already exists" ? (
            <>
              <Typography cclassName={classes.body} variant="h5">
                It looks like you already have an account under the email{" "}
                {signUpInfo.email}. Try signing in!
              </Typography>
            </>
          ) : (
            <></>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
