
import { combineReducers } from 'redux';
import { PlanSelectReducer } from '../components/Common/Dialog/reducer';
import { DeleteReducer } from '../components/DeleteDialog/Dialog/ConfirmCancelDialog/reducer';
import {DealerListingsReducer} from '../components/reducer'

export default combineReducers({
	Plan: PlanSelectReducer,
	Delete:DeleteReducer,
	dealer:DealerListingsReducer,
});
