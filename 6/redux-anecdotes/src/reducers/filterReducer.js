export const applyFilter = (filterTerm) => {
  return { type: "APPLY_FILTER", data: filterTerm };
};

const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "APPLY_FILTER":
      return action.data;
    default:
      return state;
  }
};

export default filterReducer;
