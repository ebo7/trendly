import * as api from "../api/index.js";

export const getUserGoogle = (email, name) => async (dispatch) => {
  try {
    const { data } = await api.getUserGoogle(email, name);
    console.log(data.user);
    console.log(data.token);
    dispatch({ type: "USER", payload: data.user });
    dispatch({ type: "TOKEN", payload: data.token });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (userUpdated, token) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(userUpdated, token);
    dispatch({ type: "USER", payload: data.user });
    dispatch({ type: "LOGIN_ERROR", payload: "successful profile update" });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOGIN_ERROR", payload: error.response.data.message });
  }
};

export const createUser = (signUpInfo) => async (dispatch) => {
  try {
    const { data } = await api.createUser(signUpInfo);
    dispatch({ type: "USER", payload: data.user });
    dispatch({ type: "TOKEN", payload: data.token });
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log(error.response.data.message);
      dispatch({
        type: "LOGIN_ERROR",
        payload: error.response.data.message,
      });
    }
  }
};

export const getUser = (signInInfo) => async (dispatch) => {
  try {
    const { data } = await api.getUser(signInInfo);
    dispatch({ type: "USER", payload: data.user });
    dispatch({ type: "TOKEN", payload: data.token });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOGIN_ERROR", payload: error.response.data.message });
  }
};

export const setCategoryList = (
  categoryList,
  namesList,
  email,
  token
) => async (dispatch) => {
  try {
    const { data } = await api.setCategoryList(
      categoryList,
      namesList,
      email,
      token
    );
    dispatch({ type: "CATEGORYLIST", payload: data.result });
  } catch (error) {
    console.log(error);
  }
};
