import { addLog } from "../../actions/stat.js";
import React, { useReducer, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { addStat } from "../../actions/stat.js";
import { useDispatch } from "react-redux";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import Select from "@material-ui/core/Select";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddIcon from "@material-ui/icons/Add";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import moment from "moment";

import { updateStat } from "../../actions/stat.js";
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
const EntryAdder = ({ logNames }) => {
  console.log(logNames);
  const classes = useStyles();
  const [values, setValues] = useState(new Array(logNames.length).fill(0));
  let stat = useSelector((state) => state.stat);
  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();

    let logIdx = 0;
    {
      console.log(values);
    }
    for (logIdx; logIdx < values.length; logIdx++) {
      if (values[logIdx] === null || isNaN(values[logIdx])) {
        alert("Please add all values");
        return;
      }
    }
    logIdx = 0;
    for (logIdx; logIdx < stat.logList.length; logIdx++) {
      stat.logList[logIdx].dailyGoal = values[logIdx];
    }

    dispatch(updateStat(stat, token));
    handleClose();
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const units = ["meters", "minutes"];
  const unitEmojis = ["📏", "⏱️"];
  return (
    <div>
      <Button onClick={handleClickOpen}>Add Daily Goals</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Add Daily Goals</DialogTitle>
        <DialogContent>
          <form onSubmit={onSubmit}>
            {logNames.map((logName, i) => (
              <>
                <br />
                {logName}
                <TextField
                  type="text"
                  onChange={(e) => {
                    let newValues = values;
                    newValues[i] = parseInt(e.target.value);
                    setValues(newValues);
                  }}
                />
              </>
            ))}
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
