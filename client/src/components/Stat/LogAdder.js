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
import Add from "@material-ui/icons/Add";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddIcon from "@material-ui/icons/Add";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

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
const LogAdder = ({ categoryIdx }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const stat = useSelector((state) => state.stat);
  const [statName, setStatName] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [logName, setLogName] = useState("");
  const [logEmoji, setLogEmoji] = useState("");
  const [unit, setUnit] = useState("");
  const [customUnit, setCustomUnit] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: check logName is not duplicate
    let passedUnit = unit;
    if (passedUnit == "custom") {
      passedUnit = customUnit;
    }
    dispatch(addLog(stat._id, logName, logEmoji, passedUnit, token));
    setLogName("");
    setUnit("");
    setCustomUnit("");
    handleClose();
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const units = ["meters", "minutes", "custom"];
  const unitEmojis = ["📏", "⏱️"];
  return (
    <div>
      {/* <Button onClick={handleClickOpen}>Track New Log</Button> */}
      <IconButton size="small" onClick={handleClickOpen}>
        <Add />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Add Activity</DialogTitle>
        <DialogContent>
          <form
            className={classes.form}
            onSubmit={onSubmit}
            style={{
              alignItems: "baseline",
              display: "flex",
              justifyContent: "center",
              alignContent: "space-between",
            }}
          >
            <div className={classes.dialog}>
              <TextField
                variant="filled"
                label="Name"
                autoComplete="email"
                autoFocus
                value={logName}
                onChange={(e) => setLogName(e.target.value)}
              />

              <FormControl
                className={classes.formControl}
                style={{ width: "120px" }}
              >
                <InputLabel>{"Unit"} </InputLabel>
                <Select
                  value={unit}
                  onChange={(e) => {
                    setUnit(e.target.value);
                  }}
                >
                  <MenuItem value={" "}>{"none"}</MenuItem>
                  {units.map((unit, i) => (
                    <MenuItem value={units[i]}>{units[i]}</MenuItem>
                  ))}
                </Select>
                {unit == "custom" ? (
                  <TextField
                    variant="filled"
                    label="Custom Units"
                    autoFocus
                    onChange={(e) => setCustomUnit(e.target.value)}
                  />
                ) : (
                  <div></div>
                )}
              </FormControl>
              <Picker
                exclude="recent"
                title="Pick Log Icon"
                emoji="point_up"
                onSelect={(emoji) => {
                  setLogEmoji(emoji.native);
                }}
              />
              <br />
              <Button type="submit" variant="contained" color="primary">
                Add
              </Button>
            </div>
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LogAdder;
