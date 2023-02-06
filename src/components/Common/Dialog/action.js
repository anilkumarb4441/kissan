export const openConfirmCancelDialog = (data) => {

    return (dispatch) => {
  
      dispatch({ type: "OPEN_CONFIRM_CANCEL_DIALOG" });
   
    };
  
  };
  
  
  
  export const closeConfirmCancelDialog = () => {
  
    return (dispatch) => {
  
      dispatch({ type: "CLOSE_CONFIRM_CANCEL_DIALOG" });
  
    };
  
  };

  export const setCardSource = (data) => {
      return { type: 'SET_ITEM_SRC_CARD', payload: data };
    
    }