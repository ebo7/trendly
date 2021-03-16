import React, { useReducer, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { addStat } from "../../actions/stat.js";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import { setCategoryList } from "../../actions/user.js";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";

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
const StatSelector = ({}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [userCategoryNames, setUserCategoryNames] = useState("");
  const [statNames, setStatNames] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (userCategoryNames === "") {
      alert("Choose Category Names");
      return;
    }
    if (statNames === "") {
      alert("Choose Stat Names");
      return;
    }

    setUserCategoryNames("");
    setStatNames("");

    dispatch(
      setCategoryList(
        userCategoryNames.split(","),
        statNames.split(","),
        user.email,
        token
      )
    );
    handleClose();
  };
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.href = "/statlist";
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Set Stat List</DialogTitle>
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
              <div>
                <div />
                What non-fitness categories of activities do you want to record?
                <br />
                <TextField
                  label="Ex: Nutrition,Wellness"
                  value={userCategoryNames}
                  onChange={(e) => setUserCategoryNames(e.target.value)}
                />
                <div />
                <div />
                Write down one activity for each of the above categories:
                <br />
                <TextField
                  label="Ex: Greens, Sleep"
                  value={statNames}
                  onChange={(e) => setStatNames(e.target.value)}
                />
              </div>
              <Button type="submit" variant="contained" color="primary">
                Submit
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

export default StatSelector;
