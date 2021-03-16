import React, { useReducer, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "emoji-mart/css/emoji-mart.css";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Select from "@material-ui/core/Select";

import moment from "moment";

import { updateStat } from "../../actions/stat.js";
import { addTimelinePoint } from "../../actions/timeline.js";

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
const EntryAdder = ({ logNames, units }) => {
  const classes = useStyles();
  const [date, setDate] = useState("");
  const [rating, setRating] = useState(0);
  //const [value, setValue] = useState("");
  let values = new Array(logNames.length).fill(0);
  const user = useSelector((state) => state.user);
  let stat = useSelector((state) => state.stat);
  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    values[0] = rating;
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
    for (logIdx; logIdx < logNames.length; logIdx++) {
      if (values[logIdx] === null || isNaN(values[logIdx])) {
        alert("Please add all values");
        return;
      }
    }
    logIdx = 0;
    for (logIdx; logIdx < logNames.length; logIdx++) {
      let value = values[logIdx];
      console.log(value);
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
          //back-fill the array
          // fill in-between date's value that are null with 0
          const dayDiffFromFirstDate = moment(firstDate).diff(
            moment(date),
            "days"
          );
          let i = 1;
          let fillArr = [];
          for (i; i < dayDiffFromFirstDate; i++) {
            const currDate = moment(firstDate)
              .subtract(i, "days")
              .format("YYYY-MM-DD");
            fillArr.push({
              date: currDate,
              value: 0,
              goal: stat.logList[logIdx].dailyGoal,
            });
          }
          let newArr = [];
          fillArr = fillArr.concat(stat.logList[logIdx].data);
          newArr[0] = {
            date,
            value,
            goal: stat.logList[logIdx].dailyGoal,
          };
          stat.logList[logIdx].data = newArr.concat(fillArr);
        } else {
          //forward-fill the array
          // fill in-between date's value that are null with 0
          const lastLen = stat.logList[logIdx].data.length;
          const lastDate = stat.logList[logIdx].data[lastLen - 1].date;
          const dayDiffFromLastDate = moment(date).diff(
            moment(lastDate),
            "days"
          );
          let i = 1;
          let fillArr = [];
          for (i; i < dayDiffFromLastDate; i++) {
            const currDate = moment(lastDate)
              .add(i, "days")
              .format("YYYY-MM-DD");
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
      }
      /*
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
      }*/
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Add Activity</DialogTitle>
        <DialogContent>
          <form onSubmit={onSubmit}>
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
            {logNames.map((logName, i) =>
              i === 0 ? (
                <>
                  {logName}
                  <Select
                    value={rating}
                    onChange={(e) => {
                      values[0] = parseInt(e.target.value);
                      setRating(parseInt(e.target.value));
                    }}
                  >
                    {[0, 1, 2, 3, 4, 5].map((curr_rating) => (
                      <MenuItem value={curr_rating}>{curr_rating}</MenuItem>
                    ))}
                  </Select>
                </>
              ) : (
                <>
                  <br />
                  {logName}
                  <TextField
                    type="text"
                    onChange={(e) => {
                      values[i] = parseInt(e.target.value);
                    }}
                  />
                </>
              )
            )}

            <br />
            <input type="submit" value="Submit" />
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EntryAdder;
