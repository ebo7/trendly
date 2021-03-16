export default (events = null, action) => {
  switch (action.type) {
    case "FITNESS_ALL":
      return action.payload;
    default:
      return events;
  }
};
