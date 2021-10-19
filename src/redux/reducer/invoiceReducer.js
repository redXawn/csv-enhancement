const initialState = {
  successGetInvoice: false,
  invoiceData: [],
  lastInvoicePaginationId: "",
  hasMore: false,
};
const universitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_INVOICES_DATA": {
      return {
        ...state,
        invoiceData: action.payload,
        successGetInvoice: true,
      };
    }
    case "SET_INVOICES_DATA_PAGINATION": {
      const newStateInvoice = [...state.invoiceData, ...action.payload];
      return {
        ...state,
        invoiceData: newStateInvoice,
      };
    }
    case "SET_HAS_MORE": {
      let newHasMore, newLastInvoicePaginationId;
      const lengthArr = action.payload.length;
      if (action.payload.length >= 10) {
        newHasMore = true;
        newLastInvoicePaginationId = action.payload[lengthArr - 1].id;
      } else {
        newHasMore = false;
      }
      return {
        ...state,
        lastInvoicePaginationId: newLastInvoicePaginationId,
        hasMore: newHasMore,
      };
    }
    default:
      return state;
  }
};

export default universitiesReducer;
