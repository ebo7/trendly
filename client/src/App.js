import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./css/App.css";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import About from "./components/About";
import Stat from "./components/Stat/Stat";
import Profile from "./components/Profile/Profile";
import Integrations from "./components/Integrations/Integrations";
import StatList from "./components/StatList/StatList";
import Landing from "./components/Landing/Landing";
import Network from "./components/Network/Network";
import Self from "./components/Self/Self";
import Fitness from "./components/Fitness/Fitness";
import { makeStyles } from "@material-ui/core/styles";
import "./js/carousel.js";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.main,
    minHeight: "100vh",
  },
}));


const App = () => {


  const classes = useStyles();
  const dispatch = useDispatch();
  dispatch({ type: "LOGIN_ERROR", payload: "" });
  return (
    <Router>
      <CssBaseline />
      <div className={`${classes.root} App`}>
        <Route path="/" exact component={Landing} />
        <Route path="/profile" component={Profile} />
        <Route path="/about" component={About} />
        <Route path="/stat" component={Stat} />
        <Route path="/network" component={Network} />
        <Route path="/self" component={Self} />
        <Route path="/integrations" component={Integrations} />
        <Route path="/statlist" component={StatList} />
        <Route path="/auth" component={Auth} />
        <Route path="/home" component={Home} />
        <Route path="/fitness" component={Fitness} />
      </div>
    </Router>
  );
};

export default App;
