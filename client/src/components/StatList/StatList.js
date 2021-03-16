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
import CategoryAdder from "./CategoryAdder";

import Box from "@material-ui/core/Box";
import calLogo from "../../imgs/cal2.png";
import { Avatar } from "@material-ui/core";
// import { SmallAvatar } from "@material-ui/core";

import Badge from "@material-ui/core/Badge";
import googleFitLogo from "../../imgs/gfit.png";
import Header from "../Header/Header";
import StatSelector from "./StatSelector";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "70px",
    // backgroundColor: "#041528",
    minHeight: "100vh",
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
  fab: {
    position: "absolute",
    top: "10vh",

    right: theme.spacing(26),
  },
  fab2: {
    position: "absolute",
    top: "21vh",
    right: theme.spacing(26),
  },
}));

const StatList = () => {
  const [searchString, setsearchString] = useState("");

  const handleChange = (e) => {
    console.log(e.target.value);
    setsearchString(e.target.value);
  };

  const classes = useStyles();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const statList = useSelector((state) => state.statList);
  useEffect(() => {
    dispatch(getStatList(token));
  }, []);
  let categoryList = [];
  let filteredList = [];
  if (statList && statList.categoryList) {
    categoryList = statList.categoryList.slice(1);
    //start of new code
    console.log("category List::");
    console.log(categoryList);

    /* Much slicker version of this implemented instead
    if (searchString.length !== 0) {
      categoryList.forEach(function (category) {

        console.log(category.statList);
        let stats = [];

        category.statList.forEach(function (stat) {
          let name = stat.statName;

          let index = name.indexOf(searchString);
          if (index > -1) {
            stats.push(stat);
          }


        });
        category.statList = stats;
        if (category.statList.length >= 0) {
          filteredList.push(category);
        }

      });
      //categoryList = filteredList;
      console.log("filtered categoryList: ");
      console.log(filteredList);
    }
    else {
      filteredList = categoryList;
    }
    */
    //end of new ocode
  }
  // else {
  //   return (
  //     <>
  //       <Header handler={handleChange} />
  //       <div className={classes.root}>
  //         <StatSelector />
  //       </div>
  //     </>
  //   );
  // }
  if (statList && statList.categoryList) {
  return (
    <>
      <Header handler={handleChange} />
      <Container className={classes.root}>
        {categoryList.length !== 0 && (
          <div className={classes.statList}>
            {categoryList.map((category, i) => (
              <>
                <h1>{category.categoryName}</h1>

                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="center"
                  flexWrap="wrap"
                >
                  {category.statList.map((stat, j) =>
                    stat.statName
                      .toLowerCase()
                      .indexOf(searchString.toLowerCase()) > -1 ? (
                      <div>
                        <Box>
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
                      </div>
                    ) : (
                      <div></div>
                    )
                  )}
                </Box>
              </>
            ))}
          </div>
        )}
        <Box className={classes.fab}>
          <Button
            className={classes.btn}
            size="small"
            variant="text"
            color="secondary"
            style={{ background: "transparent" }}
          >
            <CategoryAdder />
          </Button>

          <p>Add Category</p>
        </Box>
        <Box className={classes.fab2}>
          <Button
            className={classes.btn}
            size="small"
            variant="text"
            color="secondary"
            style={{ background: "transparent" }}
          >
            <StatAdder categoryList={categoryList} />
          </Button>

          <p>Add Activity</p>
        </Box>
      </Container>
    </>
  );}
  else{
    return (
      <>
        <Header handler={handleChange} />
        <div className={classes.root}>
          <StatSelector />
        </div>
      </>
    );
  }
};
export default StatList;
