import React from "react";
import { useState } from "react";
import googleLogo from "../../imgs/google.png";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getFit } from "../../actions/fit.js";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
const NUM_DAYS = 30;
const CLIENT_ID =
  "182699713917-1v6ka8errbinqo70mc7dre9j4a08a1lq.apps.googleusercontent.com";

const API_KEY = "AIzaSyAkDBRrdRle5EJDGHfkPIVfknpHt6pn8aA";

const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  "https://content.googleapis.com/discovery/v1/apis/fitness/v1/rest",
];
const SCOPES = "https://www.googleapis.com/auth/calendar";

const getAggregatedDataBody = (src, endTime) => {
  const requestBody = {
    aggregateBy: [
      {
        dataTypeName: src,
      },
    ],
    bucketByTime: {
      durationMillis: 86400000,
    },
    endTimeMillis: endTime,
    startTimeMillis: endTime - NUM_DAYS * 86400000,
  };
  return requestBody;
};

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.secondary.main,
  },
}));

/**
 * Authenticates user using Google OAuth
 * @component
 * @param {function} loginHandler - desc
 * @memberof Auth
 */
const Google = ({ loginHandler }) => {
  const classes = useStyles();
  const gapi = window.gapi;
  const dispatch = useDispatch();
  const [weekData, setWeekData] = useState([]);
  const setWeekDataHandler = (state) => {
    setWeekData(state);
  };

  const baseObj = {
    Calories: 0,
    Steps: 0,
    Distance: 0,
  };

  const dataTypes = [
    {
      title: "Calories",
      src: "com.google.calories.expended",
    },

    {
      title: "Steps",
      src: "com.google.step_count.delta",
    },
    {
      title: "Distance",
      src: "com.google.distance.delta",
    },
  ];

  const getWeeklyData = async (endTime, headers, dispatch) => {
    let state = [];
    let promises = [];

    // if (!hasCookie.present || initialState.length === 0) {
    for (var i = NUM_DAYS - 1; i >= 0; i--) {
      var currTime = new Date(endTime - i * 86400000);
      state.push({
        ...baseObj,
        Date: currTime,
      });
    }
    dataTypes.forEach((dataType) => {
      let requestBody = getAggregatedDataBody(dataType.src, endTime);
      promises.push(
        axios
          .post(
            "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
            requestBody,
            { headers: headers }
          )
          .then(
            (resp) => {
              // now, each data bucket represents exactly one day
              for (let idx = 0; idx < NUM_DAYS; idx++) {
                resp.data.bucket[idx].dataset[0].point.forEach((point) => {
                  point.value.forEach((val) => {
                    let extract = val["intVal"] || Math.ceil(val["fpVal"]) || 0;
                    state[idx][dataType.title] += extract;
                  });
                });
              }
            },
            (error) => {
              console.log(error);
            }
          )
      );
    });
    Promise.all(promises).then(() => {
      dispatch({ type: "FITNESS_ALL", payload: state });
    });
  };

  const onClick = () => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });
      gapi.auth2
        .getAuthInstance()
        .signIn({
          scope:
            "https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.location.read",
        })
        .then(
          (response) => {
            const accessToken = response.uc.access_token;
            dispatch({ type: "ACCESS_TOKEN", payload: accessToken });
            const headers = {
              Authorization: `Bearer ${accessToken}`,
              Accept: "application/json",
            };
            let endTimeMillis = new Date().getTime();
            let startTimeMillis = endTimeMillis - 3600000 * 13;
            dispatch(getFit(accessToken, startTimeMillis, endTimeMillis));
            getWeeklyData(endTimeMillis, headers, dispatch);

            const auth2 = gapi.auth2.getAuthInstance();
            const profile = auth2.currentUser.get().getBasicProfile();
            const date = new Date();
            date.setDate(date.getDate() - NUM_DAYS);
            gapi.client.calendar.events
              .list({
                calendarId: "primary",
                timeMin: date.toISOString(),
                showDeleted: false,
                singleEvents: true,
                orderBy: "startTime",
              })
              .then((response) => {
                const events = response.result.items;
                dispatch({ type: "EVENTS", payload: events.reverse() });
                loginHandler(profile.getEmail(), profile.getGivenName());
              });
          },
          (error) => {
            console.log(error);
          }
        );
    });
  };
  return (
    <div>
      <Button
        endIcon={<Avatar src={googleLogo} color="secondary" />}
        // className={classes.submit}
        type="submit"
        variant="contained"
        color="primary"
        onClick={onClick}
      >
        Sign in with Google
      </Button>
    </div>
  );
};

export default Google;
