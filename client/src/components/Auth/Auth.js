import logo from "../../imgs/logo3.png";
import SignUp from "./SignUp";
import Particles from "react-particles-js";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SignIn from "./SignIn";
import { useState } from "react";
import { particlesOptions } from "../../particlesOptions";
import Google from "./Google";
import { useDispatch, useSelector } from "react-redux";
import { getUserGoogle } from "../../actions/user.js";
import { Redirect } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "70px",
  },
  particles: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  hr: {
    border: 0,
    height: "1px",
    backgroundImage:
      "linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0))",
  },
}));

/**
 Authenticates user using either Google OAuth or custom sign in/sign up
 * @component
 * @param {function}  loginHandler - desc
 * @namespace Auth
 */
const Auth = () => {
  const token = useSelector((state) => state.token);
  // if (token) {
  //   console.log(token);
  //   window.location.href = "/statlist";
  // }
  const dispatch = useDispatch();
  const loginHandler = (emailInp, firstNameInp) => {
    dispatch(getUserGoogle(emailInp, firstNameInp));
  };
  dispatch({ type: "LOGIN_ERROR", payload: "" });
  const classes = useStyles();
  const [showSignIn, setShowSignIn] = useState(true);

  return (
    <>
      {token && <Redirect to="/statlist" />}
      <div className={classes.root}>
        <Particles className={classes.particles} params={particlesOptions} />
        <img
          src={logo}
          style={{
            background: "transparent",
            height: "auto",
            width: "250px",
          }}
          alt="logo"
        />
        <p>Welcome to Trendly!</p>

        <Google loginHandler={loginHandler} />

        <br />
        <br />

        <hr className={classes.hr} style={{ width: 420 }} />

        {showSignIn ? (
          <>
            <SignIn />
            <Button
              style={{ color: "white" }}
              onClick={() => {
                setShowSignIn(false);
              }}
            >
              Don't have an account? Sign Up
            </Button>
          </>
        ) : (
          <>
            <SignUp />
            <Button
              style={{ color: "white" }}
              onClick={() => {
                setShowSignIn(true);
              }}
            >
              Already have an account? Sign in
            </Button>
          </>
        )}
      </div>
    </>
  );
};
export default Auth;
