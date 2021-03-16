export default (stats = null, action) => {
  switch (action.type) {
    case "FITNESS_STATS":
      return action.payload;

    default:
      return stats;
  }
};
