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

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  root: {
    paddingTop: "70px",
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[700],
    color: theme.palette.primary.main,
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
}));

const tiers = [
  {
    title: "Google Calendar",
    description: calendarLogo,
    buttonText: "Deactivate",
    buttonVariant: "outlined",
  },
  {
    title: "Google Fit",
    description: fitnessLogo,
    buttonText: "Deactivate",
    buttonVariant: "outlined",
  },
];
export default function Integrations() {
  const classes = useStyles();

  return (
    <>
      <Header />
      <br />
      <Container maxWidth="sm" component="main" className={classes.root}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          // color="textPrimary"
          gutterBottom
        >
          Integrations
        </Typography>
        <Typography
          variant="h5"
          align="center"
          // color="textSecondary"
          component="p"
        >
          Integrating other services will facilitate your tracking process
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            <Grid item key={tier.title} xs={12} sm={6} md={6}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{ align: "center" }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <img src={tier.description} />
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant}
                    color="primary"
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
