import { combineReducers } from "redux";

import user from "./user";
import stat from "./stat";
import token from "./token";
import statList from "./statList";
import events from "./events";
import fitness from "./fitness";
import fitnessAll from "./fitnessAll";
import fitnessStats from "./fitnessStats";

import login_error from "./login_error";
import accessToken from "./accessToken";

import timeline from "./timeline";
import networkTimeline from "./networkTimeline";

export const reducers = combineReducers({
  user,
  stat,
  token,
  statList,
  login_error,
  events,
  fitness,
  fitnessAll,
  accessToken,
  timeline,
  networkTimeline,
  fitnessStats,
});
