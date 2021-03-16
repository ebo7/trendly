import js from "./scripts.js";
import "./Header.css";
import React from "react";
import logo from "../../imgs/logo3b.png";
import { persistor } from "../../store";
import decode from "jwt-decode";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import fitLogo from "../../imgs/gfit.png";
import Icon from "@material-ui/core/Icon";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import deepOrange from "@material-ui/core/colors/deepOrange";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import PublicIcon from "@material-ui/icons/Public";
import Menu from "@material-ui/core/Menu";
import ExitToApp from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
  logo: {
    height: 50,
    width: 50,
    background: "transparent",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: "#3d5afe",
    fontSize: "35px",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      marginRight: theme.spacing(0),
    },
    width: "16%",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    color: "white",
  },
  input: {
    justifySelf: "center",
    color: "white",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    backgroundColor: "white",
    width: "24px",
    height: "24px",
    fontSize: "17px",
    color: "black",
  },

  left: {
    flexGrow: 1,
    flexBasis: 0,
    display: "flex",
    justifyContent: "center",
  },
  right: {
    flexGrow: 1,
    flexBasis: 0,

    display: "flex",
    justifyContent: "center",
  },
}));

const Header = ({ handler }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();
  const user = useSelector((state) => state.user);

  const token = useSelector((state) => state.token);
  useEffect(() => {
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        persistor.purge();
        window.location.href = "/home";
      }
    }
  }, [window.location]);

  const routeToMain = () => {
    window.location.href = "/home";
  };
  return (
    <div>
      <section className="smart-scroll">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left}>
            <img
              src={logo}
              className={classes.logo}
              alt="logo"
              onClick={() => routeToMain()}
            />

            <Typography
              className={classes.title}
              // variant="h6"
              // noWrap
              onClick={() => routeToMain()}
            >
              Trendly
            </Typography>
          </div>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              id="header-search-bar"
              className={classes.input}
              placeholder="Search for an Activity..."
              inputProps={{ "aria-label": "search" }}
              onChange={handler}
            />
          </div>
          <div className={classes.right}>
            <IconButton
              color="inherit"
              onClick={() => {
                window.location.href = "/statlist";
              }}
            >
              <ShowChartIcon style={{ fill: "white" }} />
            </IconButton>

            <IconButton
              color="inherit"
              onClick={() => {
                window.location.href = "/fitness";
              }}
            >
              <FitnessCenterIcon style={{ fill: "white" }} />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => {
                window.location.href = "/network";
              }}
            >
              <PublicIcon style={{ fill: "white" }} />
            </IconButton>
            <IconButton color="inherit" onClick={handleMenu}>
              <Avatar className={classes.avatar}>
                {user.name.slice(0, 1)}
              </Avatar>
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  window.location.href = "/profile";
                }}
              >
                <AccountCircleOutlinedIcon />
                {/* <Avatar className={classes.avatar}>
                  {user.name.slice(0, 1)}
                </Avatar> */}
                &nbsp;&nbsp;Profile
              </MenuItem>

              <MenuItem
                onClick={() => {
                  window.location.href = "/self";
                }}
              >
                <CalendarTodayOutlinedIcon />
                &nbsp;&nbsp;Timeline
              </MenuItem>

              <MenuItem
                onClick={() => {
                  window.location.href = "/integrations";
                }}
              >
                <SettingsOutlinedIcon style={{ fill: "" }} />
                &nbsp;&nbsp;Settings
              </MenuItem>

              <MenuItem
                onClick={() => {
                  persistor.purge();
                  window.location.href = "/auth";
                }}
              >
                <ExitToApp style={{ fill: "" }} />
                &nbsp;&nbsp;Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
        <div className={classes.appBarSpacer} />
      </section>
    </div>
  );
};

export default Header;
