import axios from "axios";

const API = axios.create();

API.interceptors.request.use((req) => {
  // token is directly included in request as localStorage has lag/latency
  console.log(req.data);
  if (req.data) {
    req.headers.Authorization = `Bearer ${req.data.token}`;
  }
  return req;
});

export const getUserGoogle = (email, name) => {
  return API.get("/user/g", {
    params: { email: email, name: name },
  });
};

export const updateUser = (userUpdated, token) => {
  const email = userUpdated.email;
  const id = userUpdated._id;
  const name = userUpdated.name;
  const password = userUpdated.password;
  return API.patch(`/user/${userUpdated._id}`, {
    id,
    email,
    name,
    password,
    token,
  });
};

export const createUser = (signUpInfo) => {
  return API.post("/user/signup", signUpInfo);
};

export const getUser = (signInInfo) => {
  return API.post("/user/signin", signInInfo);
};

export const getStatList = (token) => {
  return API.get("/statList", { params: { token: token }, data: { token } });
};

export const getStat = (statId, token) => {
  return API.get("/stat", {
    params: { statId, token },
    data: { token },
  });
};

export const getStats = (statIds, token) => {
  return API.get("/stat/many", {
    params: { statIds, token },
    data: { token },
  });
};

export const addLog = (statId, logName, logEmoji, unit, token) => {
  return API.patch(`/stat/addLog`, {
    statId,
    logName,
    logEmoji,
    unit,
    token,
  });
};

export const setCategoryList = (categoryList, namesList, email, token) => {
  return API.post(`/user/setCategoryList`, {
    categoryList,
    namesList,
    email,
    token,
  });
};

export const updateStat = (newStat, token) => {
  return API.patch(`/stat/updateStat`, {
    newStat,
    token,
  });
};

export const addStat = (statName, categoryIdx, emoji, token) => {
  return API.post(`/stat`, {
    statName,
    categoryIdx,
    emoji,
    token,
  });
};

export const addCategory = (categoryName, token) => {
  return API.post(`/stat/addCategory`, {
    categoryName,
    token,
  });
};

export const addTimelinePoint = (
  userId,

  date,
  statName,
  statEmoji,
  rating,
  logList,
  userName,
  token
) => {
  console.log(logList);
  return API.post(`/timeline`, {
    userId,

    date,
    statName,
    statEmoji,
    rating,
    logList,
    userName,
    token,
  });
};
export const getTimeline = (token) => {
  return API.get("/timeline", { data: { token } });
};
export const getNetworkTimeline = (network, token) => {
  console.log(network);
  return API.get("/timeline/network", {
    params: { network },
    data: { token },
  });
};
