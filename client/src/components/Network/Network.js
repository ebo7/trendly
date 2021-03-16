import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import MTimeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import { useState } from "react";
import "./Network.css";
import Header from "../Header/Header";
// import Carousel from "./Carousel";
import { getNetworkTimeline } from "../../actions/timeline.js";
import { createDispatchHook, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTimeline } from "../../actions/timeline.js";
import NetworkCard from "./Card";
import NetworkTimeline from "../Self/Timeline";
import { red } from "@material-ui/core/colors";

import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "70px",
  },
  cardGrid: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(0),
  },
  card: {
    textAlign: "initial",
  },
  cardMedia: {
    width: "800px",
    // height: "auto",
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  const rating = [
    "No Rating Logged",
    "⭐",
    "⭐⭐",
    "⭐⭐⭐",
    "⭐⭐⭐⭐",
    "⭐⭐⭐⭐⭐",
  ];
  const classes = useStyles();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const network = [user._id];

  console.log(token);
  const dispatch = useDispatch();
  // currently only i have id
  useEffect(() => {
    dispatch(getNetworkTimeline(network, token));
  }, []);
  const timeline = useSelector((state) => state.networkTimeline);
  console.log("check page infinite reload");

  return (
    <>
      <Header />
      <main className={classes.root}>
        <Container className={classes.cardGrid} sm={1}>
          <Grid container spacing={10} direction="row">
            {timeline &&
              timeline.map((dayBucket, i) =>
                dayBucket.arr.map((point) => (
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Card className={classes.card}>
                      <CardHeader
                        avatar={
                          <Avatar
                            aria-label="recipe"
                            className={classes.avatar}
                          >
                            {point.userName && point.userName.slice(0, 1)}
                          </Avatar>
                        }
                        action={
                          <IconButton aria-label="settings">
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title={point.userName}
                        subheader={dayBucket._id.slice(0, 10)}
                      />
                      <div class="media">
                        <div class="layer">
                          {point.logList.map((log) => (
                            <>
                              {log.logName === "Rating" ? (
                                <p>{rating[log.value]}</p>
                              ) : (
                                <p>
                                  {log.logName}
                                  {": "} {log.value} {log.unit}
                                </p>
                              )}
                            </>
                          ))}
                        </div>
                        <div>
                          <CardMedia
                            className={classes.cardMedia}
                            image="https://runningmagazine.ca/wp-content/uploads/2014/05/trusty-pair-Brooks-running-shoes-got-reader-through.jpg"
                            title="Image title"
                          />

                          {/* <img src="https://source.unsplash.com/random" alt="" /> */}
                        </div>
                      </div>
                      <CardContent>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          <div style={{ textAlign: "center" }}>
                            {point.statName}
                          </div>
                          {
                            //divider not displaying
                          }
                          <div class="divider"></div>
                          New Best! 🤗
                        </Typography>
                      </CardContent>
                      <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                          <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                          <ShareIcon />
                        </IconButton>
                        {/* <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton> */}
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              )}
          </Grid>
        </Container>
      </main>
    </>
  );
}
