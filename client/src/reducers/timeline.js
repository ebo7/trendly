export default (timeline = null, action) => {
  switch (action.type) {
    case "TIMELINE":
      return action.payload;
    default:
      return timeline;
  }
};
