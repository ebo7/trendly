import * as api from "../api/index.js";

export const addTimelinePoint = async (
  userId,
  date,
  logNames,
  units,
  values,
  statName,
  statEmoji,
  rating,
  userName,
  token
) => {
  let logList = [];
  logNames.map((logName, i) => {
    logList.push({
      logName,
      unit: units[i],
      value: values[i],
    });
  });
  try {
    await api.addTimelinePoint(
      userId,
      date,
      statName,
      statEmoji,
      rating,
      logList,
      userName,
      token
    );
  } catch (error) {
    console.log(error);
  }
};

export const getTimeline = (token) => async (dispatch) => {
  try {
    const { data } = await api.getTimeline(token);
    dispatch({ type: "TIMELINE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getNetworkTimeline = (network, token) => async (dispatch) => {
  try {
    const { data } = await api.getNetworkTimeline(network, token);
    console.log(data);
    dispatch({ type: "NETWORK_TIMELINE", payload: data });
  } catch (error) {
    console.log(error);
  }
};
