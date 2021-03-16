export default (events = null, action) => {
  switch (action.type) {
    case "FITNESS":
      return action.payload;
    default:
      return events;
  }
};
