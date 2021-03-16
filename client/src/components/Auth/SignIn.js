import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { getUser } from "../../actions/user.js";
import Particles from "react-particles-js";

import { createMuiTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textField: {
    "& .MuiFormLabel-root": {
      color: "white", // or black
    },
  },
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
    background: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: theme.palette.secondary.main,
  },
}));
const initialState = {
  email: "",
  password: "",
};

/**
 * Authenticates user by checking user's name and password against database
 * @memberof Auth
 * @component
 */
const SignIn = () => {
  const classes = useStyles();

  const login_error = useSelector((state) => state.login_error);

  const dispatch = useDispatch();
  const [loginInfo, setLoginInfo] = useState(initialState);
  const onChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(getUser(loginInfo));
  };
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            className={classes.textField}
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={loginInfo.email}
            onChange={onChange}
            backgroundColor="secondary"
            InputProps={{
              className: classes.multilineColor,
            }}
          />
          <TextField
            className={classes.textField}
            variant="filled"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            color="secondary"
            autoComplete="current-password"
            value={loginInfo.password}
            onChange={onChange}
            InputProps={{
              className: classes.multilineColor,
            }}
          />
          {login_error == "Invalid Password" ||
          login_error == "User doesn't exist" ? (
            <>
              <Typography cclassName={classes.body} variant="h5">
                We couldn't find a user matching that email and password
                combination.
              </Typography>
            </>
          ) : (
            <></>
          )}

          {login_error === "Email is registered using google" && (
            <>
              <Typography cclassName={classes.body} variant="h5">
                It looks like that email uses google sign-in! Try signing in
                with google for that email.
              </Typography>
            </>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            // className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
};
export default SignIn;
