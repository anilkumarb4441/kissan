let initialState = {
    dealerListings: [],
    generalListings:[],
    dealerPlanData:'',
    dealerTotalAmtTobePaid:'',
    listingsArr:[],
  };
   
  export const DealerListingsReducer = (state = initialState, action) => {
   switch (action.type) {
    
      case 'SET_DEALER_LISTINGS':
      return { ...state, dealerListings: action.payload };   
      case 'SET_GENERAL_LISTINGS':
      return { ...state, generalListings: action.payload };
      case 'SET_DEALER_LISTINGS_PLAN_DATA':
      return { ...state, dealerPlanData: action.payload };      
      case 'SET_DEALER_COST_PAYMENT':
      return { ...state, dealerTotalAmtTobePaid: action.payload };
      case 'SET_DEALER_LISTINGS_ID':
      return { ...state, listingsArr: action.payload };      
      default:
        return state;
    }
     };