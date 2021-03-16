import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { reducers } from "./reducers";

const persistConfig = {
  key: "root",
  storage,
  // whitelist: [
  //   "accessToken",
  //   "events",
  //   "fitness",
  //   "fitnessAll",
  //   "login_error",
  //   "networkTimeline",
  //   "stats",
  //   "statList",
  //   "timeline",
  //   "token",
  //   "user",
  // ],
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
  persistedReducer,
  compose(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
