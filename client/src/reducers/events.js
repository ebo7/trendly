export default (events = null, action) => {
  switch (action.type) {
    case "EVENTS":
      return action.payload;
    default:
      return events;
  }
};
