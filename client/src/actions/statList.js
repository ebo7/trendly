import * as api from "../api/index.js";

export const getStatList = (token) => async (dispatch) => {
  try {
    const { data } = await api.getStatList(token);

    dispatch({ type: "STATLIST", payload: data });
  } catch (error) {
    console.log(error);
  }
};
