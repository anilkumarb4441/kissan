export const setDealerListings = (data) => {
    return (dispatch) => {
      dispatch({ type: "SET_DEALER_LISTINGS", payload: data});
    };
  };
  export const setGeneralListings = (data) => {
    return (dispatch) => {
      dispatch({ type: "SET_GENERAL_LISTINGS", payload: data});
    };
  };
  export const setDealerListingsPlanData = (data) => {
    return (dispatch) => {
      dispatch({ type: "SET_DEALER_LISTINGS_PLAN_DATA", payload: data});
    };
  };
  export const setDealerCostPayment = (data) => {
    return (dispatch) => {
      dispatch({ type: "SET_DEALER_COST_PAYMENT", payload: data});
    };
  };
  export const setDealerListingsId = (data) => {
    return (dispatch) => {
      dispatch({ type: "SET_DEALER_LISTINGS_ID", payload: data});
    };
  };
  