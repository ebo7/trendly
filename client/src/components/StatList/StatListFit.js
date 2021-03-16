import { useSelector } from "react-redux";
import { Link, matchPath, Route } from "react-router-dom";
import { getStat, selectStat } from "../../actions/stat.js";
import { useDispatch } from "react-redux";
import { getStatList } from "../../actions/statList.js";
import { useEffect, useState } from "react";
import { addStat } from "../../actions/stat";
import Button from "@material-ui/core/Button";
import Star from "@material-ui/icons/Star";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";

import Grid from "@material-ui/core/Grid";
import FavoriteIcon from "@material-ui/icons/Favorite";
import StatAdder from "./StatAdder";

import Box from "@material-ui/core/Box";
import calLogo from "../../imgs/cal2.png";
import { Avatar } from "@material-ui/core";
// import { SmallAvatar } from "@material-ui/core";

import Badge from "@material-ui/core/Badge";
import googleFitLogo from "../../imgs/gfit.png";
import Header from "../Header/Header";
// import StatMetrics from "../Stat/StatMetrics";
// import "../../js/carousel.js";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "70px",
    // backgroundColor: "#041528",
    // minHeight: "100vh",
    // display: "flex",
    // justifyContent: "center",
    paddingLeft: theme.spacing(2),

    paddingRight: theme.spacing(2),
  },
  statList: {
    textAlign: "center",
  },
  btn: {
    border: 0,
    borderRadius: 25,
    height: 45,
    margin: "10px 15px",
    background: "#ededed",
    fontSize: 36,
  },
  icon: {
    color: "transparent",
    textShadow: "0 0 white",
  },
  statAdder: {
    position: "fixed",
  },
  smallAvatar: {
    backgroundColor: "purple",
    height: "25px",
    width: "25px",
    border: `2px solid #ededed`,
  },
}));

const StatListFit = () => {
  const dispatch = useDispatch();

  // dispatch(getFit());
  const classes = useStyles();

  const fitness = useSelector((state) => state.fitnessAll);
  const user = useSelector((state) => state.user);

  const token = useSelector((state) => state.token);
  const statList = useSelector((state) => state.statList);

  let fitStats = [];
  if (statList && statList.categoryList) {
    fitStats = statList.categoryList[0].statList;
  }
  console.log(fitStats);
  //console.log("loop");
  useEffect(() => {
    dispatch(getStatList(token));
  }, []);

  console.log("carouselView");

  const [searchString, setsearchString] = useState("");


  const handleChange = (e) => {
    console.log(e.target.value);
    setsearchString(e.target.value);
  };

  return (
    <div className={classes.root}>
      <br />
      <br />
      <br />
      <Container
        maxWidth="md"
        style={{
          // display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <div>
            <StatAdder categoryIdx={0} />
            <p>namnamedf;</p>
          </div>

          <div className="carousel">
            <div>
              <StatAdder categoryIdx={0} />
              <p>namnamedf;</p>
            </div>
            <div>
              <StatAdder categoryIdx={0} />
              <p>namnamedf;</p>
            </div>
            <div>
              <StatAdder categoryIdx={0} />
              <p>namnamedf;</p>
            </div>

            <div>
              <StatAdder categoryIdx={0} />
              <p>namnamedf;</p>
            </div>
            {fitStats.map((stat, j) => (
              <div>
                <Button
                  className={classes.btn}
                  size="small"
                  variant="text"
                  color="secondary"
                  key={stat._id}
                  onClick={() => {
                    dispatch(getStat(stat.statId, token));
                  }}
                >
                  <Link to="/stat" className="link">
                    {stat.emoji}
                  </Link>
                </Button>
                <p>{stat.statName} </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
      {/* {fitStats.length !== 0 && (
        <div className={classes.statList}>
          <>
            <StatMetrics />

            <div
              className="carousel"
              style={{ width: "800px" }}
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
            >
              <div>
                {fitStats.map((stat, j) => (
                  <div>
                    <Button
                      className={classes.btn}
                      size="small"
                      variant="text"
                      color="secondary"
                      key={stat._id}
                      onClick={() => {
                        dispatch(getStat(stat.statId, token));
                      }}
                    >
                      <Link to="/stat" className="link">
                        {stat.emoji}
                      </Link>
                    </Button>
                    <p>{stat.statName} </p>
                  </div>
                ))}
                <div>
                  <StatAdder categoryIdx={0} />
                  <p>namnamedf;</p>
                </div>
                <div>
                  <StatAdder categoryIdx={0} />
                  <p>namnamedf;</p>
                </div>
                <div>
                  <StatAdder categoryIdx={0} />
                  <p>namnamedf;</p>
                </div>
              </div> */}

      {/* <Box>
                <StatAdder categoryIdx={0} />
                <p>namnamedf;</p>
              </Box> */}
      {/* </div>
          </>
        </div>
      )} */}
    </div>
  );
};

export default StatListFit;
