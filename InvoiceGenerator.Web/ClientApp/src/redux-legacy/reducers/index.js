import { combineReducers } from "redux";

//import invoiceHistoryReducer from "./invoiceHistoryReducer";
//import invoiceDetailsReducer from "./invoiceDetailsReducer";
import issuerDetailsReducer from "./issuerDetailsReducer";
import recipantDetailsReducer from "./recipantDetailsReducer";
import invoiceTableDetailsReducer from "./invoiceTableDetailsReducer";
//import userInterfaceReducer from './userInterfaceReducer';

import invoiceTableReducer from "../../redux-toolkit/features/invoieTableSlice";
import invoiceHistoryReducer from "../../redux-toolkit/features/invoiceHistorySlice";
import invoiceDetailsReducer from "../../redux-toolkit/features/invoiceDetailsSlice";
import recipantReducer from "../../redux-toolkit/features/recipantSlice";
import issuerReducer from "../../redux-toolkit/features/issuerSlice";
import userInterfaceReducer from "../../redux-toolkit/features/userInterfaceSlice";


const rootReducer = combineReducers({
	invoice: invoiceDetailsReducer,
	issuer: issuerReducer,
	recipant: recipantReducer,
	invoiceTable: invoiceTableReducer,//invoiceTableReducer,
	history: invoiceHistoryReducer,
	ui: userInterfaceReducer
});

export default rootReducer;