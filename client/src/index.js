import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import { store, persistor } from "./store";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import lightGreen from "@material-ui/core/colors/lightGreen";
import green from "@material-ui/core/colors/green";
import pink from "@material-ui/core/colors/pink";
import indigo from "@material-ui/core/colors/indigo";
import deepPurple from "@material-ui/core/colors/deepPurple";
import purple from "@material-ui/core/colors/purple";

import grey from "@material-ui/core/colors/grey";
import blue from "@material-ui/core/colors/blue";
import cyan from "@material-ui/core/colors/blue";
import yellow from "@material-ui/core/colors/yellow";
import orange from "@material-ui/core/colors/orange";
import amber from "@material-ui/core/colors/amber";

import lightBlue from "@material-ui/core/colors/lightBlue";
//disable console logging for demo
console.log = console.warn = console.error = () => {};
const theme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[700],
    },
    secondary: {
      main: "#00e676",
    },
    text: {
      // primary: "#fff",
      // secondary: grey[300],
    },
    background: {
      main: "#1e1e30",
      light: "#26293d",
      selected: indigo[600],
      paper: "#fafafa",
      paperSelected: grey[300],
    },
  },
});
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
