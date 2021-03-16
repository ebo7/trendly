import { useState, useEffect } from "react";
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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { Line, Doughnut } from "react-chartjs-2";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

import HeaderFit from "../Header/HeaderFit";
import MainChart from "./MainChart.js";
import DoughnutChart from "./DoughnutChart.js";
import ProgressChart from "./ProgressChart.js";

import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { useDispatch } from "react-redux";
import { getStatList } from "../../actions/statList.js";
import { getStat, getStats } from "../../actions/stat.js";
import { Link } from "react-router-dom";
import StatAdderFit from "../StatList/StatAdderFit";
import { DEFAULT_VERSION } from "redux-persist/es/constants";
import mapImg from "../../imgs/map.png";
import CardMedia from "@material-ui/core/CardMedia";
import BarChartIcon from "@material-ui/icons/BarChart";
import ShowChartIcon from "@material-ui/icons/ShowChart";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  bgLight: {
    background: theme.palette.background.light,
  },
  root: {
    paddingTop: "90px",
  },
  chartHeader: {
    display: "flex",
    height: "25px",
  },
  left: {
    flexGrow: 1,
    flexBasis: 0,
    display: "flex",
    justifyContent: "left",
  },
  leftButton: {
    background: theme.palette.primary.main,
    color: "white",
  },
  center: {
    flexGrow: 1,
    flexBasis: 0,
    display: "flex",
    justifyContent: "center",
    width: "auto",
  },
  right: {
    flexGrow: 1,
    flexBasis: 0,
    display: "flex",
    justifyContent: "flex-end",
  },

  rightButton: {
    borderWidth: "3px",
    color: "white",
  },
  chartContent: {
    height: "200px",
  },
  btn: {
    border: 0,
    borderRadius: 25,
    height: 45,
    margin: "10px 15px",
    // background: "#ededed",

    background: "transparent",
    background: theme.palette.background.light,
    fontSize: 36,
  },
  icon: {
    fill: theme.palette.primary.main,
    fill: "white",
    fontSize: "30px",
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();

  let fitStatsIds = null;
  let fitness = null;
  useEffect(() => {
    if (!fitness) {
      dispatch(getStatList(token));
    }
    if (fitStatsIds) {
      dispatch(getStats(fitStatsIds, token));
    }
  }, []);
  const [range, setRange] = useState(7);
  // const [metricIdx, setMetricIdx] = useState(0);
  const [open, setOpen] = useState(true);
  const [noteIdx, setNoteIdx] = useState(0);
  const notes = ["a", "b", "c", "d"];
  const openDrawerHandler = () => {
    setOpen(true);
  };
  const closedDrawerHandler = () => {
    setOpen(false);
  };

  const [logIdx, setLogIdx] = useState(0);
  const [isLine, setIsLine] = useState(false);
  const setLogIdxHandler = (idx) => {
    setLogIdx(idx);
  };
  const stat = useSelector((state) => state.stat);
  fitness = useSelector((state) => state.fitnessAll);
  const fitnessStats = useSelector((state) => state.fitnessStats);
  const logNames = ["Calories", "Steps", "Distance"];
  const logEmojis = ["🔥", "👟", "📏"];
  const units = ["kcal", "", "meters"];
  let dates = [];
  let allValues = [[], [], []];
  if (fitness) {
    fitness.map((entry) => {
      allValues[0].push(entry.Calories);
      allValues[1].push(entry.Steps);
      allValues[2].push(entry.Distance);

      dates.push(entry.Date.slice(0, 10));
    });
  }
  const token = useSelector((state) => state.token);
  const statList = useSelector((state) => state.statList);

  let fitStats = null;
  if (statList.categoryList) {
    fitStats = statList.categoryList[0].statList;
    fitStatsIds = fitStats.map((fitStat) => fitStat.statId);
  }
  if (fitStatsIds.length !== 0) {
    console.log("dispatching");
    // console.log(token);
    // dispatch(getStats(fitStatsIds, token));
  }

  console.log("loop");

  console.log(fitStats);
  console.log(fitStatsIds);

  const [searchString, setsearchString] = useState("");

  const handleChange = (e) => {
    console.log("fitnessChange");
    console.log(e.target.value);
    setsearchString(e.target.value);
  };

  let refMain;
  let refProgress;
  let refPercentage;
  return (
    <>
      <HeaderFit />
      <div className={classes.root}>
        {fitness ? (
          // fitness metrics for users with google fit
          <>
            <h3>Fitness Activities</h3>

            <Container
              maxWidth="md"
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
            >
              <div className="carousel">
                <Box>
                  {/* <StatAdder categoryIdx={0} className={classes.btn} />
              <p>Activity</p> */}
                  <Button
                    className={classes.btn}
                    size="small"
                    variant="text"
                    color="secondary"
                    style={{ background: "transparent" }}
                  >
                    {/* <Link to="/stat" className="link"> */}
                    {/* + */}
                    <StatAdderFit categoryIdx={0} />
                    {/* </Link> */}
                  </Button>

                  {/* <p>&nbsp;</p> */}

                  <p>Add Activity</p>
                </Box>

                {fitStats.map((stat, j) => (
                  <Box>
                    <Button
                      className={classes.btn}
                      size="small"
                      variant="text"
                      color="secondary"
                      onClick={() => {
                        dispatch(getStat(stat.statId, token));
                      }}
                    >
                      <Link
                        to={{
                          pathname: "/stat",
                          state: { isFit: true },
                        }}
                      >
                        {stat.emoji}
                      </Link>
                    </Button>
                    <p>{stat.statName} </p>
                  </Box>
                ))}
              </div>
            </Container>
            <Container maxWidth="lg" flexDirection="row">
              <br />
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <div
                    className="chartCard"
                    style={{
                      background: "#26293d",
                    }}
                  >
                    <div className={classes.chartHeader}>
                      <div className={classes.left}>
                        <Select
                          className={classes.leftButton}
                          value={range}
                          variant="outlined"
                          onChange={(e) => {
                            setRange(e.target.value);
                            refMain.updateState({
                              labels: dates.slice(-e.target.value),

                              data: allValues[logIdx].slice(-e.target.value),
                              isLine,
                            });
                          }}
                        >
                          <MenuItem value={7}>Last week</MenuItem>

                          <MenuItem value={30}>Last month</MenuItem>
                        </Select>
                      </div>
                      <div className={classes.center}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            setIsLine(!isLine);
                            refMain.updateState({
                              labels: dates.slice(-range),

                              data: allValues[0].slice(-range),
                              isLine: !isLine,
                            });
                          }}
                        >
                          {isLine ? (
                            <>
                              {/* Show As */}
                              <BarChartIcon className={classes.icon} />
                            </>
                          ) : (
                            <>
                              {/* Show As */}
                              <ShowChartIcon className={classes.icon} />
                            </>
                          )}
                        </Button>
                      </div>

                      <div className={classes.right}>
                        <ButtonGroup variant="outlined" color="primary">
                          <Button
                            className={classes.rightButton}
                            variant={`${
                              logIdx === 0 ? "contained" : "outlined"
                            }`}
                            onClick={(e) => {
                              setLogIdx(0);
                              refMain.updateState({
                                labels: dates.slice(-range),

                                data: allValues[0].slice(-range),
                                isLine,
                              });
                              refPercentage.updateState({
                                logIdx: 0,
                              });
                              refProgress.updateState({
                                logIdx: 0,
                              });
                            }}
                          >
                            Calories
                          </Button>
                          <Button
                            variant={`${
                              logIdx === 1 ? "contained" : "outlined"
                            }`}
                            onClick={(e) => {
                              setLogIdx(1);
                              refMain.updateState({
                                labels: dates.slice(-range),

                                data: allValues[1].slice(-range),
                                isLine,
                              });
                              refPercentage.updateState({
                                logIdx: 1,
                              });
                              refProgress.updateState({
                                logIdx: 1,
                              });
                            }}
                            className={classes.rightButton}
                          >
                            Steps
                          </Button>
                          <Button
                            onClick={(e) => {
                              setLogIdx(2);
                              refMain.updateState({
                                labels: dates.slice(-range),

                                data: allValues[2].slice(-range),
                                isLine,
                              });
                              refPercentage.updateState({
                                logIdx: 2,
                              });
                              refProgress.updateState({
                                logIdx: 2,
                              });
                            }}
                            variant={`${
                              logIdx === 2 ? "contained" : "outlined"
                            }`}
                            className={classes.rightButton}
                          >
                            Distance
                          </Button>
                        </ButtonGroup>
                      </div>
                    </div>
                    <br />

                    <div className={classes.chartContent}>
                      <MainChart
                        ref={(ele) => {
                          refMain = ele;
                        }}
                        labels={dates.slice(-7)}
                        data={allValues[0].slice(-7)}
                        isLine={isLine}
                      />
                    </div>
                  </div>
                </Grid>

                <Grid container item spacing={6}>
                  <Grid item xs={4}>
                    <h5>Percentages by Activity</h5>
                    <div
                      style={{
                        height: "375px",
                      }}
                    >
                      {fitnessStats && (
                        <DoughnutChart
                          stats={fitnessStats}
                          ref={(ele) => {
                            refPercentage = ele;
                          }}
                          logIdx={0}
                        />
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <h5>Progress</h5>
                    <div
                      style={{
                        height: "375px",
                      }}
                    >
                      {console.log(fitnessStats)}
                      {fitnessStats && (
                        <ProgressChart
                          stats={fitnessStats}
                          ref={(ele) => {
                            refProgress = ele;
                          }}
                          logIdx={0}
                        />
                      )}
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    style={{
                      height: "375px",
                    }}
                  >
                    <h5>Recent Adventures</h5>
                    <Paper
                      style={{
                        height: "375px",
                        background: "transparent",
                      }}
                    >
                      <CardMedia
                        image={mapImg}
                        style={{
                          height: "375px",
                          width: "auto",
                          borderRadius: "8%",
                        }}
                      />
                    </Paper>
                    {/* <img
                    src={mapImg}
                    style={{ height: "350px", width: "auto" }}
                  /> */}
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </>
        ) : (
          // fitness stats
          <>
            <h2>Fitness Activities</h2>
            <Container
              maxWidth="md"
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
            >
              <div className="carousel">
                <Box>
                  {/* <StatAdder categoryIdx={0} className={classes.btn} />
              <p>Activity</p> */}
                  <Button
                    className={classes.btn}
                    size="small"
                    variant="text"
                    color="secondary"
                    style={{ background: "transparent" }}
                  >
                    {/* <Link to="/stat" className="link"> */}
                    {/* + */}
                    <StatAdderFit categoryIdx={0} />
                    {/* </Link> */}
                  </Button>

                  {/* <p>&nbsp;</p> */}

                  <p>Add Activity</p>
                </Box>

                {fitStats &&
                  fitStats.map(
                    (stat, j) =>
                      stat.statName
                        .toLowerCase()
                        .indexOf(searchString.toLowerCase()) > -1 && (
                        <Box>
                          <Button
                            className={classes.btn}
                            size="small"
                            variant="text"
                            color="secondary"
                            onClick={() => {
                              dispatch(getStat(stat.statId, token));
                            }}
                          >
                            <Link
                              to={{
                                pathname: "/stat",
                                state: { isFit: false },
                              }}
                            >
                              {stat.emoji}
                            </Link>
                          </Button>
                          <p>{stat.statName} </p>
                        </Box>
                      )
                  )}
              </div>
            </Container>
          </>
        )}
      </div>
    </>
  );
}
