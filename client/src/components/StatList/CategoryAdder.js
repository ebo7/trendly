import React, { useReducer, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { addCategory } from "../../actions/stat.js";
import Fab from "@material-ui/core/Fab";

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
const CategoryAdder = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const stat = useSelector((state) => state.stat);
  const [categoryName, setCategoryName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (categoryName === "") {
      alert("Choose name");
      return;
    }

    setCategoryName("");

    dispatch(addCategory(categoryName, token));
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
      <IconButton onClick={handleClickOpen}>
        <AddCircleIcon
          style={{
            fill: "#ededed",
            fontSize: "50px",
          }}
        />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Add Category</DialogTitle>
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
                <div className={classes.divider} />
                <TextField
                  label="Category Name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
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

export default CategoryAdder;
