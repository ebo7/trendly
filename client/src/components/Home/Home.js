import Header from "../Header/Header";
import calendarLogo from "../../imgs/calendar.png";
import fitnessLogo from "../../imgs/gfit.png";

import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/StarBorder";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import "../../css/App.css";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "70px",
  },
}));

export default function Integrations() {
  const classes = useStyles();
  const user = useSelector((state) => state.user);

  return (
    <>
      <Header />
      <Container maxWidth="sm" component="main" className={classes.root}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          // color="textPrimary"
          gutterBottom
        >
          <h2>Welcome back to Trendly, {user.name}!</h2>
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item xs={12} sm={6} md={6}>
            <Button
              onClick={() => {
                window.location.href = "/statlist";
              }}
            >
              <h1>Everyday</h1>
            </Button>

            <IconButton
              onClick={() => {
                window.location.href = "/statlist";
              }}
            >
              <img
                src="https://source.unsplash.com/random"
                style={{
                  background: "transparent",
                  // borderRadius: "50%"
                }}
              />
            </IconButton>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Button
              onClick={() => {
                window.location.href = "/fitness";
              }}
            >
              <h1>Fitness</h1>
            </Button>
            <IconButton
              onClick={() => {
                window.location.href = "/fitness";
              }}
            >
              <img
                src="https://source.unsplash.com/random"
                style={{ background: "transparent" }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
