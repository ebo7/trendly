import * as api from "../api/index.js";
import axios from "axios";

export const getFit = (accessToken, startTimeMillis, endTimeMillis) => async (
  dispatch
) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/json",
  };
  try {
    getData(startTimeMillis, endTimeMillis, headers, dispatch);
  } catch (error) {
    console.log(error);
  }
};

const API_KEY = "AIzaSyAkDBRrdRle5EJDGHfkPIVfknpHt6pn8aA";

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

const getData = async (startTimeMillis, endTimeMillis, headers, dispatch) => {
  let state = {
    Calories: 0,
    Steps: 0,
    Distance: 0,
  };
  let promises = [];
  dataTypes.forEach((dataType) => {
    const requestBody = {
      aggregateBy: [
        {
          dataTypeName: dataType.src,
        },
      ],
      endTimeMillis,
      startTimeMillis,
    };
    promises.push(
      axios
        .post(
          "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
          requestBody,
          { headers: headers }
        )
        .then(
          (resp) => {
            resp.data.bucket[0].dataset[0].point.forEach((point) => {
              point.value.forEach((val) => {
                let extract = val["intVal"] || Math.ceil(val["fpVal"]) || 0;
                state[dataType.title] += extract;
              });
            });
          },
          (error) => {
            console.log(error);
          }
        )
    );
  });
  Promise.all(promises).then(() => {
    dispatch({ type: "FITNESS", payload: state });
  });
};
