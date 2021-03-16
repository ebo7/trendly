import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTimeline } from "../../actions/timeline.js";
import "./Album.css";
const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
    background: "black",
    background: theme.palette.primary.main,
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  const rating = ["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"];
  const classes = useStyles();
  const token = useSelector((state) => state.token);
  console.log(token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTimeline(token));
  }, []);
  const timeline = useSelector((state) => state.timeline);

  return (
    <main>
      {!timeline ? (
        <h4>Add stats to see timeline </h4>
      ) : (
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={2}>
            {timeline.map((dayBucket, i) =>
              dayBucket.arr.map((point) => (
                <Grid item xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    {point.statName}
                    <div class="media">
                      <div class="layer">
                        {console.log(point)}
                        {/* <ul> */}
                        {point.logList.map((log) => (
                          <p>
                            {log.logName}
                            {": "} {log.value} {log.unit}
                          </p>
                        ))}
                        {/* </ul> */}
                      </div>
                      <div
                        style={{
                          background: "https://source.unsplash.com/random",
                        }}
                      >
                        <img src="https://source.unsplash.com/random" alt="" />
                      </div>
                    </div>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      )}
    </main>
  );
}
