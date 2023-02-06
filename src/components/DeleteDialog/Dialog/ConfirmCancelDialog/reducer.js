let initialState = {
    deleteModal: "",
      cardSrc:"",
      button:""
  };
   
  export const DeleteReducer = (state = initialState, action) => {
   switch (action.type) {
    
     case "OPEN_CONFIRM_DELETE_DIALOG_SETTINGS":
        return { ...state, deleteModal: true };
      case "CLOSE_CONFIRM_DELETE_DIALOG_SETTINGS":
        return { ...state, deleteModal: false };  
      case 'SET_COMPONENT_DATA_DELETE_CONFIRM':
      return { ...state, button: action.payload };      
      default:
        return state;
    }
     };