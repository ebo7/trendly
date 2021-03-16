import React, { useReducer, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "emoji-mart/css/emoji-mart.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import moment from "moment";
import { updateStat } from "../../actions/stat.js";
import { getFit } from "../../actions/fit.js";
import { addTimelinePoint } from "../../actions/timeline.js";
import { getTimeline } from "../../actions/timeline.js";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {},
  divider: {
    width: "20px",
    height: "auto",
    display: "inline-block",
  },
  marginTop: {
    margin: theme.spacing(3, 0, 2),
  },
  form: {
    width: "100%",
  },
  dialog: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));
const EntryAdderFit = ({ logNames, units }) => {
  const classes = useStyles();
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const user = useSelector((state) => state.user);
  const [rating, setRating] = useState(0);

  let values = new Array(logNames.length).fill(0);
  console.log("looped");
  const [calories, setCalories] = useState(0);
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState(0);

  let stat = useSelector((state) => state.stat);
  const token = useSelector((state) => state.token);
  const fitness = useSelector((state) => state.fitness);

  useEffect(() => {
    console.log("loop");
    setCalories(fitness.Calories);
    setSteps(fitness.Steps);
    setDistance(fitness.Distance);
  }, [fitness]);

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.accessToken);
  const onClickDevice = (e) => {
    e.preventDefault();
    const startTimeMillis = new Date(date + "T" + startTime).getTime();
    const endTimeMillis = new Date(date + "T" + endTime).getTime();
    console.log(startTimeMillis);
    console.log(endTimeMillis);
    dispatch(getFit(accessToken, startTimeMillis, endTimeMillis));
    console.log(fitness);
    setCalories(fitness.Calories);
    setSteps(fitness.Steps);
    setDistance(fitness.Distance);
    values[0] = fitness.Calories;
    values[1] = fitness.Steps;
    values[2] = fitness.Distance;
  };
  const onSubmit = (e) => {
    values[0] = calories;
    values[1] = steps;
    values[2] = distance;
    values[3] = rating;
    console.log(values);
    e.preventDefault();
    if (!date) {
      alert("Please select date");
      return;
    }
    // not rigorous, 1 day in the future is being added
    let timeNow = new Date().getTime();
    let time = new Date(date).getTime();
    if (time > timeNow) {
      alert("Date can't be future");
      return;
    }
    let logIdx = 0;
    for (logIdx; logIdx < values.length; logIdx++) {
      if (values[logIdx] === null || isNaN(values[logIdx])) {
        alert("Please add all values");
        return;
      }
    }
    logIdx = 0;
    for (logIdx; logIdx < values.length; logIdx++) {
      let value = values[logIdx];
      if (stat.logList[logIdx].data.length === 0) {
        let entry = {
          date: date,
          value: value,
          goal: stat.logList[logIdx].dailyGoal,
        };
        stat.logList[logIdx].data = [entry];
      }
      // has previous entry
      else {
        const firstDate = stat.logList[logIdx].data[0].date;
        const dayDiffFromFirstDate = moment(date).diff(
          moment(firstDate),
          "days"
        );
        if (dayDiffFromFirstDate < 0) {
          alert("Date should be greater than first entry's");
          return;
        }
        // fill missing date's value with 0
        const lastLen = stat.logList[logIdx].data.length;
        const lastDate = stat.logList[logIdx].data[lastLen - 1].date;
        const dayDiffFromLastDate = moment(date).diff(moment(lastDate), "days");
        let i = 1;
        let fillArr = [];
        for (i; i < dayDiffFromLastDate; i++) {
          const currDate = moment(lastDate).add(i, "days").format("YYYY-MM-DD");
          fillArr.push({
            date: currDate,
            value: 0,
            goal: stat.logList[logIdx].dailyGoal,
          });
        }
        stat.logList[logIdx].data = stat.logList[logIdx].data.concat(fillArr);
        stat.logList[logIdx].data[dayDiffFromFirstDate] = {
          date,
          value,
          goal: stat.logList[logIdx].dailyGoal,
        };
      }
      // auto fill rating with 0
      if (logIdx !== 0) {
        if (stat.logList[0].data.length === 0) {
          const entry = {
            date: date,
            value: 0,
            goal: stat.logList[logIdx].dailyGoal,
          };
          stat.logList[0].data = [entry];
        } else {
          const lastLen = stat.logList[0].data.length;
          const lastDate = stat.logList[0].data[lastLen - 1].date;
          const dayDiffFromLastDate = moment(date).diff(
            moment(lastDate),
            "days"
          );
          let i = 1;
          let fillArr = [];
          for (i; i < dayDiffFromLastDate + 1; i++) {
            const currDate = moment(lastDate)
              .add(i, "days")
              .format("YYYY-MM-DD");
            fillArr.push({
              date: currDate,
              value: 0,
              goal: stat.logList[logIdx].dailyGoal,
            });
          }
          stat.logList[0].data = stat.logList[0].data.concat(fillArr);
        }
      }
    }
    dispatch(updateStat(stat, token));
    addTimelinePoint(
      user._id,
      date,
      logNames.slice(1),
      units.slice(1),
      values.slice(1),
      stat.statName,
      stat.emoji,
      values[0],
      user.name,
      token
    );
    // values = new Array(logNames.length).fill(0);
    // setRating(0);
    // setDate("");
    handleClose();
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button onClick={handleClickOpen}>Add Entry</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <p style={{ color: "black" }}>Add Activity</p>
        </DialogTitle>
        <DialogContent>
          <>
            Latest date can be 3 days before today as Google Fit has sync delay
            <form key={0}>
              <TextField
                type="date"
                value={date}
                style={{ background: "white" }}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
              <br />
              start
              <TextField
                type="time"
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                }}
              ></TextField>
              <br />
              end
              <TextField
                type="time"
                value={endTime}
                onChange={(e) => {
                  setEndTime(e.target.value);
                }}
              ></TextField>
              <button onClick={onClickDevice}> Use Integrated Service</button>
              <br />
            </form>
            <form onSubmit={onSubmit} key={1}>
              {/* <TextField type="datetime-local"></TextField> */}
              <br />
              <br />
              Calories
              <TextField
                key={0}
                type="text"
                value={calories}
                onChange={(e) => {
                  // values[0] = parseInt(e.target.value);

                  console.log(values);
                  setCalories(parseInt(e.target.value));

                  console.log(values);
                }}
              />
              <br />
              Steps
              <TextField
                type="text"
                value={steps}
                onChange={(e) => {
                  // values[1] = parseInt(e.target.value);

                  setSteps(parseInt(e.target.value));

                  console.log(values);
                }}
              />
              <br />
              Distance
              <TextField
                type="text"
                value={distance}
                onChange={(e) => {
                  // values[2] = parseInt(e.target.value);

                  setDistance(parseInt(e.target.value));

                  console.log(values);
                }}
              />
              {logNames.slice(3).map((logName, i) =>
                i === 0 ? (
                  <>
                    {logName}
                    <Select
                      key={i}
                      value={rating}
                      onChange={(e) => {
                        // values[3] = parseInt(e.target.value);

                        setRating(parseInt(e.target.value));

                        console.log(values);
                      }}
                    >
                      {[0, 1, 2, 3, 4, 5].map((rating, j) => (
                        <MenuItem key={j} value={rating}>
                          {rating}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                ) : (
                  <>
                    <br />
                    {logName}
                    {/* <TextField
                      type="text"
                      onChange={(e) => {
                        values[i + 3] = parseInt(e.target.value);
                        console.log(values);
                      }}
                    /> */}
                    <TextField
                      key={i}
                      type="text"
                      onChange={(e) => {
                        values[i + 3] = parseInt(e.target.value);
                        console.log(values);
                      }}
                    />
                  </>
                )
              )}
              <br />
              <input type="submit" />
            </form>
          </>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EntryAdderFit;
