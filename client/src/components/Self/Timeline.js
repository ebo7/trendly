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
import { useState } from "react";
import "../../css/card.css";
import React from "react";
// import Carousel from "./Carousel";
import { getNetworkTimeline } from "../../actions/timeline.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTimeline } from "../../actions/timeline.js";
import Album from "./Album";
import img from "../../imgs/timelinePic.jpg";

const useStyles = makeStyles((theme) => ({
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
  const rating = [
    "no rating provided",
    "⭐",
    "⭐⭐",
    "⭐⭐⭐",
    "⭐⭐⭐⭐",
    "⭐⭐⭐⭐⭐",
  ];
  const classes = useStyles();
  const token = useSelector((state) => state.token);

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
  console.log("check page infinite reload");
  return (
    <>
      {timeline && timeline.length === 0 && <h4>Add stats to see timeline </h4>}
      <MTimeline align="alternate">
        {timeline.map((dayBucket, i) => {
          return (
            <TimelineItem>
              <TimelineOppositeContent
                style={{ flex: 1 }}
                className={classes.verticallyCenterContent}
              >
                <>
                  <h6>{dayBucket._id.slice(0, 10)}</h6>
                </>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent className={classes.verticallyCenterContent}>
                <div className={i % 2 == 1 ? "cardsReversed" : "cards"}>
                  {dayBucket.arr.map((point) => {
                    return (
                      <div className={i % 2 == 1 ? "cardReversed" : "card"}>
                        <h4 style={{ color: "white" }}>
                          {point.statName} {point.statEmoji}
                        </h4>
                        <img src="https://source.unsplash.com/random" />
                        <h4>{rating[point.rating]}</h4>
                      </div>
                    );
                  })}
                </div>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </MTimeline>
    </>
  );
};

export default NetworkTimeline;
