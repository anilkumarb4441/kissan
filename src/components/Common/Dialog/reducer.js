let initialState = {
    cancelModal: "",
      cardSrc:"",
  };
   
  export const PlanSelectReducer = (state = initialState, action) => {
   switch (action.type) {
    
     case "OPEN_CONFIRM_CANCEL_DIALOG":
        return { ...state, cancelModal: true };
      case "CLOSE_CONFIRM_CANCEL_DIALOG":
        return { ...state, cancelModal: false };  
      case "SET_ITEM_SRC_CARD":
            return { ...state, cardSrc: action.payload };
      default:
        return state;
    }
     };