import * as api from "../api/index.js";
export const selectStat = (statId) => (dispatch) => {
  try {
    dispatch({ type: "STAT", payload: statId });
  } catch (error) {
    console.log(error);
  }
};

export const getStat = (statId, token) => async (dispatch) => {
  try {
    const { data } = await api.getStat(statId, token);
    dispatch({ type: "STAT", payload: data });
  } catch (error) {
    console.log(error);
  }
};

// currently used for getting only fitness stats
export const getStats = (statIds, token) => async (dispatch) => {
  try {
    const { data } = await api.getStats(statIds, token);
    console.log("aaa");
    console.log(data);
    dispatch({ type: "FITNESS_STATS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addLog = (statId, logName, logEmoji, unit, token) => async (
  dispatch
) => {
  try {
    const { data } = await api.addLog(statId, logName, logEmoji, unit, token);
    dispatch({ type: "STAT", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateStat = (newStat, token) => async (dispatch) => {
  try {
    const { data } = await api.updateStat(newStat, token);
    dispatch({ type: "STAT", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const addStat = (statName, categoryIdx, emoji, token) => async (
  dispatch
) => {
  try {
    const { data } = await api.addStat(statName, categoryIdx, emoji, token);
    dispatch({ type: "STATLIST", payload: data.result });
  } catch (error) {
    console.log(error);
  }
};

export const addCategory = (categoryName, token) => async(
  dispatch
) => {
  try {
    const { data } = await api.addCategory(categoryName, token);
    dispatch({ type: "STATLIST", payload: data.result });
  } catch (error) {
    console.log(error);
  }
};
