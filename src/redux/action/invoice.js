import axios from "axios";

export const getInvoices = (query, nextPage) => (dispatch) => {
  dispatch({ type: "LOADING" });
  return axios
    .get(`http://localhost:8080/xendit/invoices${query}`)
    .then((res) => {
      const payload = res.data.data;
      dispatch({
        type: "SET_HAS_MORE",
        payload: payload,
      });

      if (nextPage) {
        return dispatch({
          type: "SET_INVOICES_DATA_PAGINATION",
          payload: payload,
        });
      } else {
        return dispatch({
          type: "SET_INVOICES_DATA",
          payload: payload,
        });
      }
    })
    .catch((error) => {
      console.log("error", error);
      dispatch({ type: "SET_ERROR", payload: { errorMessage: "error", status: true } });
    })
    .then(() => {
      dispatch({ type: "UNLOAD" });
    });
};
