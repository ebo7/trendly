import MTimeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import { makeStyles } from "@material-ui/core/styles";
import TimelineDot from "@material-ui/lab/TimelineDot";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import { useState } from "react";
import "../../css/card.css";
import React from "react";
import Header from "../Header/Header";
// import Carousel from "./Carousel";
import { getNetworkTimeline } from "../../actions/timeline.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTimeline } from "../../actions/timeline.js";
import Album from "./Album";
import Timeline from "./Timeline";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "70px",
  },
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  verticallyCenterContent: {
    margin: "auto 0",
  },
}));

const NetworkTimeline = ({ isNetwork }) => {
  const rating = ["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"];
  const classes = useStyles();
  const token = useSelector((state) => state.token);
  const [asAlbum, setAsAlbum] = useState(true);
  // const network = useSelector((state) => state.user.network);
  console.log(token);
  const dispatch = useDispatch();
  // TODO: need to add option to add to network
  // as demo here is trent and ebo's id created with gmail
  let network = ["603edffd0cf6586007e3d4ca", "603e2fcd3e3a0ee822635ca2"];
  useEffect(() => {
    dispatch(getTimeline(token));
  }, []);
  const timeline = useSelector((state) => state.timeline);
  console.log("looped");
  return (
    <>
      <Header />
      <div className={classes.root}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => {
            setAsAlbum(!asAlbum);
          }}
        >
          {asAlbum ? "Show as Timeline" : "Show as Album"}
        </Button>
        {asAlbum ? <Album /> : <Timeline />}
      </div>
    </>
  );
};

export default NetworkTimeline;
