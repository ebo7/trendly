export default (login_error = null, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      return action.payload;
    default:
      return login_error;
  }
};
