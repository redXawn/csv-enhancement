const initialState = {
  loading: 0,
};
const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING": {
      return {
        ...state,
        loading: state.loading + 1,
      };
    }
    case "UNLOAD": {
      return {
        ...state,
        loading: state.loading - 1,
      };
    }
    case "RESET_LOADING": {
      return {
        ...state,
        loading: 0,
      };
    }
    default:
      return state;
  }
};

export default loadingReducer;
