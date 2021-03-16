export default (token = null, action) => {
  switch (action.type) {
    case "TOKEN":
      return action.payload;
    default:
      return token;
  }
};
