const initialState = {
  error: {
    errorMessage: "",
    status: false,
  },
};
const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ERROR": {
      const newError = { ...state.error };
      for (let key in action.payload) {
        newError[key] = action.payload[key];
      }
      return {
        ...state,
        error: newError,
      };
    }
    case "RESET_ERROR": {
      return {
        ...state,
        error: {
          errorMessage: "",
          status: false,
        },
      };
    }
    default:
      return state;
  }
};

export default errorReducer;
