import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import StarIcon from "@material-ui/icons/Star";
import VisibilityIcon from "@material-ui/icons/Visibility";

import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  listItem: {
    backgroundColor: theme.palette.background.paperSelected,
  },
  root: {
    color: "black",
  },
}));
const LogList = ({ logIdx, logNames, logEmojis, setLogIdxHandler }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {logNames.map((logName, i) => {
        return (
          <>
            <ListItem
              className={i === logIdx ? classes.listItem : ""}
              button
              onClick={() => {
                setLogIdxHandler(i);
              }}
            >
              <ListItemAvatar style={{ fontSize: "20px" }}>
                {logEmojis[i]}
              </ListItemAvatar>
              <ListItemText primary={logName} />
              {/* <VisibilityIcon style={{ fill: "purple" }} /> */}
            </ListItem>
          </>
        );
      })}
    </div>
  );
};
export default LogList;
