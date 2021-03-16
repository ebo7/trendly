export default (accessToken = null, action) => {
  switch (action.type) {
    case "ACCESS_TOKEN":
      return action.payload;
    default:
      return accessToken;
  }
};
