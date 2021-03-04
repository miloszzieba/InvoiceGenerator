const history = {
    creationDate: "",
    invoiceNumber: "",
    jsonEncodedInvoice: "",
}
const initialState = {
    table: [history],
    isLoading: false,
    error: "",
    selectedListItemIndex: -1
}

const invoiceHistoryReducer = (state = initialState, action) => {
    if (action.type === 'FETCH_INVOICE_HISTORY_SUCCESS') {
        return Object.assign({}, state, {
            table: action.payload.history,
            isLoading: false
        });
    }
    else if (action.type === "GET_INVOICE_HISTORY_PENDING") {
        return Object.assign({}, state, {
            isLoading: true,
        }); 
    }
    else if (action.type === "SELECT_LIST_ITEM") {
        return { ...state, selectedListItemIndex: action.payload }
    }
    else
        return state
}



export default invoiceHistoryReducer