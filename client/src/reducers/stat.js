export default (stat = null, action) => {
  switch (action.type) {
    case "STAT":
      return action.payload;

    default:
      return stat;
  }
};
