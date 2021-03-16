import { useState } from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import List from "@material-ui/core/List";
import { Line, Doughnut } from "react-chartjs-2";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import useStyles from "./StatStyles";
import LogAdder from "./LogAdder";
import EntryAdder from "./EntryAdder";
import EntryAdderFit from "./EntryAdderFit";

import GoalAdder from "./GoalAdder";

import LogList from "./LogList";
import Footer from "../Footer";
import Header from "../Header/Header";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import StarIcon from "@material-ui/icons/Star";

export default function Stat(props) {
  const { isFit } = props.location.state;
  const classes = useStyles();
  const [range, setRange] = useState(7);
  const [open, setOpen] = useState(true);
  const [noteIdx, setNoteIdx] = useState(0);
  const notes = ["a", "b", "c", "d"];
  const openDrawerHandler = () => {
    setOpen(true);
  };
  const closedDrawerHandler = () => {
    setOpen(false);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [logIdx, setLogIdx] = useState(0);
  const setLogIdxHandler = (idx) => {
    setLogIdx(idx);
  };
  const stat = useSelector((state) => state.stat);
  let allDates;
  let allValues;
  let allGoals;
  let logNames;
  let logEmojis;
  let units;
  let dailyGoals;
  if (stat && stat.logList) {
    allDates = stat.logList.map((log) => {
      const dates = log.data.slice(-30).map((entry) => entry.date);
      return dates;
    });
    allValues = stat.logList.map((log) => {
      const values = log.data.slice(-30).map((entry) => entry.value);
      return values;
    });
    allGoals = stat.logList.map((log) => {
      let dailyGoal = log.dailyGoal;
      const values = new Array(log.data.length).fill(dailyGoal);
      return values;
    });
    logNames = stat.logList.map((log) => log.logName);
    logEmojis = stat.logList.map((log) => log.logEmoji);
    dailyGoals = stat.logList.map((log) => log.dailyGoal);
    //console.log(dailyGoals);
    units = stat.logList.map((log) => log.unit);
    //console.log(units);
  }
  return (
    <>
      {/* <Header /> */}
      <div className={classes.root}>
        {logNames !== undefined && (
          <>
            <AppBar
              position="absolute"
              className={clsx(classes.appBar, open && classes.appBarShift)}
            >
              <Toolbar className={classes.toolbar}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={openDrawerHandler}
                  className={clsx(
                    classes.menuButton,
                    open && classes.menuButtonHidden
                  )}
                >
                  <MenuIcon style={{ fill: "white" }} />
                </IconButton>

                {!open && logNames[logIdx]}
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  className={classes.title}
                >
                  {stat.statName} {stat.emoji}
                  <StarIcon style={{ fill: "#fc6400" }} />
                </Typography>
                <IconButton color="inherit">
                  <ArrowBackIcon
                    style={{ fill: "white" }}
                    onClick={() => {
                      if (isFit) {
                        window.location.href = "/fitness";
                      } else {
                        window.location.href = "/statlist";
                      }
                    }}
                  />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              classes={{
                paper: clsx(
                  classes.drawerPaper,
                  !open && classes.drawerPaperClose
                ),
              }}
              open={open}
            >
              <div className={classes.toolbarIcon}>
                <IconButton onClick={closedDrawerHandler}>
                  <ChevronLeftIcon style={{ fill: "white" }} />
                </IconButton>
              </div>
              <Divider />
              <List>
                <LogList
                  logIdx={logIdx}
                  logNames={logNames}
                  logEmojis={logEmojis}
                  setLogIdxHandler={setLogIdxHandler}
                />

                <LogAdder />
              </List>
              {/* <br /> */}

              <Divider />
              <br />
              {console.log(stat)}
              {open && (
                <>
                  {isFit ? (
                    <EntryAdderFit logNames={logNames} units={units} />
                  ) : (
                    <EntryAdder logNames={logNames} units={units} />
                  )}

                  <GoalAdder logNames={logNames} />
                </>
              )}
            </Drawer>
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Container
                maxWidth="lg"
                className={classes.container}
                flexDirection="row"
              >
                <Grid container spacing={3} direction="row">
                  <Grid item xs={12} sm={12}>
                    <Paper className={classes.paper}>
                      <div>
                        <select
                          onChange={(e) => {
                            setRange(e.target.value);
                          }}
                        >
                          <option value={7} label="Last week"></option>

                          <option value={30} label="Last month"></option>
                        </select>
                        <Button>As Bar Chart</Button>
                      </div>
                      <Line
                        data={{
                          labels: allDates[logIdx].slice(-range),
                          datasets: [
                            {
                              label: logNames[logIdx],
                              data: allValues[logIdx].slice(-range),
                              pointRadius: 3,
                              pointHoverRadius: 14,
                              lineTension: false,
                              fill: false,
                              borderColor: "#227cd4",
                              borderColor: "green",
                              borderWidth: 1,
                            },
                            {
                              label: "Goal",
                              data: allGoals[logIdx].slice(-range),
                              pointRadius: 3,
                              pointHoverRadius: 14,
                              lineTension: false,
                              fill: false,
                              borderColor: "#227cd4",
                              borderColor: "red",
                              borderWidth: 1,
                            },
                          ],
                        }}
                        // width={200}
                        // height={100}
                        options={{
                          onClick: function (evt, element) {
                            if (element.length > 0) {
                              setNoteIdx(element[0]._index);
                            }
                          },
                        }}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Paper className={fixedHeightPaper}>
                      <Typography color="primary">
                        Success Rate
                        <Tooltip title="success rate is aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa">
                          <HelpOutlineIcon
                            fontSize="small"
                            font={{ fontSize: "2px" }}
                            // size="small"
                          />
                        </Tooltip>
                      </Typography>
                      <Doughnut
                        data={{
                          datasets: [
                            {
                              data: [90, 10],
                              backgroundColor: ["Green", "Red"],
                            },
                          ],
                        }}
                        options={{
                          rotation: 1 * Math.PI,
                          circumference: 1 * Math.PI,
                        }}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Paper className={fixedHeightPaper}>
                      <Typography color="primary">
                        Performance Rate
                        <Tooltip title="performance rate is aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa">
                          <HelpOutlineIcon
                            fontSize="small"
                            font={{ fontSize: "2px" }}
                            // size="small"
                          />
                        </Tooltip>
                      </Typography>
                      <Doughnut
                        data={{
                          // labels: ["b1", "b2"],
                          datasets: [
                            {
                              data: [80, 20],
                              backgroundColor: ["Green", "Red"],
                            },
                          ],
                        }}
                        // width={200}
                        // height={100}
                        options={{
                          rotation: 1 * Math.PI,
                          circumference: 1 * Math.PI,
                        }}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Paper className={fixedHeightPaper}>
                      <Typography color="primary"> Daily Goal </Typography>
                      {dailyGoals[logIdx]}{" "}
                      {dailyGoals[logIdx] != null ? units[logIdx] : null}
                    </Paper>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Paper className={fixedHeightPaper}>
                      <Typography color="primary">Average</Typography>
                      ...
                      <br />
                      <br />
                      <Typography color="primary">Best</Typography>
                      ...
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
            </main>
          </>
        )}
      </div>
    </>
  );
}
