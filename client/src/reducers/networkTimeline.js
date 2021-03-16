export default (networkTimeline = null, action) => {
  switch (action.type) {
    case "NETWORK_TIMELINE":
      return action.payload;
    default:
      return networkTimeline;
  }
};
