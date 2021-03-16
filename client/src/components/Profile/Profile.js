import logo from "../../imgs/logo.jpg";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUser } from "../../actions/user.js";
import { useState } from "react";
import Header from "../Header/Header";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";

export default function Profile() {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const login_error = useSelector((state) => state.login_error);
  const dispatch = useDispatch();
  const initialState = {
    name: user.name,
    email: user.email,
    password: "",
    confirmPassword: "",
  };
  const [loginInfo, setLoginInfo] = useState(initialState);
  const onChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };
  const useStyles = makeStyles((theme) => ({
    textField: {
      "& .MuiFormLabel-root": {
        color: "white", // or black
      },
    },
    multilineColor: {
      color: "white",
    },
    root: {
      paddingTop: "70px",
    },
    paper: {
      marginTop: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: theme.palette.primary.main,
    },
  }));
  const classes = useStyles();

  //const onSubmit = (e) => {};
  //  e.preventDefault();
  //  dispatch(updateUser(loginInfo));
  //};
  const onSubmit = (e) => {
    e.preventDefault();
    if (loginInfo.password !== loginInfo.confirmPassword) {
      alert("The passwords you entered don't match.");
      return;
    }
    if (loginInfo.password == "") {
      alert("The password fields cannot be blank. Please enter a password.");
      return;
    } else if (loginInfo.password.length < 8) {
      alert(
        "Passwords must be at least 8 characters. Please enter a longer password."
      );
      return;
    }
    if (loginInfo.name == "") {
      alert("The name field cannot be blank. Please enter a name.");
      return;
    }
    if (loginInfo.email == "") {
      alert("The email field cannot be blank. Please enter an email.");
      return;
    }
    const userUpdated = {
      ...user,
      email: loginInfo.email,
      name: loginInfo.name,
      password: loginInfo.password,
    };
    dispatch(updateUser(userUpdated, token));
  };
  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs" className={classes.root}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Profile
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
              InputProps={{
                className: classes.multilineColor,
              }}
              onChange={onChange}
            />
            {login_error == "Another user already has this email!" ? (
              <>
                <Typography variant="h6">
                  Another user already has this email!
                </Typography>
              </>
            ) : (
              <></>
            )}
            <TextField
              className={classes.textField}
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={loginInfo.name}
              InputProps={{
                className: classes.multilineColor,
              }}
              onChange={onChange}
            />
            <TextField
              className={classes.textField}
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="password"
              label="New Password"
              id="new_password"
              type="password"
              autoFocus
              value={loginInfo.password}
              InputProps={{
                className: classes.multilineColor,
              }}
              onChange={onChange}
            />
            <TextField
              className={classes.textField}
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm New Password"
              id="confirm_new_password"
              type="password"
              autoFocus
              value={loginInfo.confirmPassword}
              InputProps={{
                className: classes.multilineColor,
              }}
              onChange={onChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Save Changes
            </Button>
            {login_error == "Email is registered using google" ? (
              <>
                <Typography cclassName={classes.body} variant="h6">
                  We don't support profile updates for accounts that use google
                  to sign-in.
                </Typography>
              </>
            ) : (
              <></>
            )}
            {login_error == "successful profile update" ? (
              <>
                <Typography cclassName={classes.body} variant="h6">
                  Success! Your profile has been updated with the info you
                  inputted above.
                </Typography>
              </>
            ) : (
              <></>
            )}
          </form>
        </div>
      </Container>
    </>
  );
}
