export default (statList = null, action) => {
  switch (action.type) {
    case "STATLIST":
      return action.payload;
    default:
      return statList;
  }
};
