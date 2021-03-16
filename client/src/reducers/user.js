export default (user = null, action) => {
  switch (action.type) {
    case "USER":
      return action.payload;

    default:
      return user;
  }
};
