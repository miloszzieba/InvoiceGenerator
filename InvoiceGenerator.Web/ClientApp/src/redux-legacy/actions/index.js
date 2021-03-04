import axios from 'axios';
import { SET_INVOICE_DETAILS, SET_RECIPANT_DETAILS, SET_ISSUER_DETAILS, SET_INVOICE_TABLE, ADD_ITEM, UPDATE_ITEM, SELECT_LIST_ITEM, FETCH_INVOICE_HISTORY_SUCCESS } from '../constants/actionTypes';
import { INVOICE_HISTORY_URL } from '../../Resources/endpoints_LOCAL'

export function setInvoiceDetails(name, val) {
    return {
        type: SET_INVOICE_DETAILS,
        payload: {
            name,
            val
        }
    }
}
export function setRecipantDetails(name: string, val: string) {
    return {
        type: SET_RECIPANT_DETAILS,
        name,
        val
    }
}
export function setIssuerDetails(name: string, val: string) {
    return {
        type: SET_ISSUER_DETAILS,
        name,
        val
    }
}

export function setInvoiceTable(name: string, val: string) {
    return {
        type: SET_INVOICE_TABLE,
        name,
        val
    }
}

export function addItem(obj) {
    return {
        type: ADD_ITEM,
        obj
    }
}

export function updateItem(id: string, field: string, val: string) {
    return {
        type: "UPDATE_ITEM",
        id,
        field,
        val
    }
}

export function removeItem(id: number) {
    return {
        type: "REMOVE_ITEM",
        id
    }
}

export function calculateTable(): Action {
    return {
        type: "CALCULATE_TABLE",
    }
}

export function setPreviewInvoice(previewInvoiceFlag: boolean) {
    return {
        type: "PREVIEW_INVOICE",
        previewInvoiceFlag
    }
}

export function moveRowUp(rowId: number) {
    return {
        type: "MOVE_ROW_UP",
        rowId
    }
}

export function moveRowDown(rowId: number) {
    return {
        type: "MOVE_ROW_DOWN",
        rowId
    }
}

export function setIsInvoicePaidOff(isInvoicePaidOff: boolean) {
    return {
        type: "SET_INVOICE_PAID_OFF",
        isInvoicePaidOff
    }
}

export function amountInWords(amount: number) {
    return {
        type: "AMOUNT_IN_WORDS",
        amount
    }
}
export function getInvoiceHistoryPending() {
    return {
        type: "GET_INVOICE_HISTORY_PENDING",
    }
}

export function selectListItem(itemId) {
    return {
        type: SELECT_LIST_ITEM,
        payload: itemId
    }
}
export const fetchInvoiceHistoryListSuccess = history => ({
    type: FETCH_INVOICE_HISTORY_SUCCESS,
    payload: { history }
})

export function fetchInvoiceHistoryList() {
    return async dispatch => {
        dispatch(getInvoiceHistoryPending());
        try {
            await axios.get(INVOICE_HISTORY_URL).then(response => {
            dispatch(fetchInvoiceHistoryListSuccess(response.data))
            dispatch(snackBarSuccess("Pobrano liste historii faktur"))
            }
            );
        }
        catch (e) {
            console.log(e);
            dispatch(snackBarError("Wystapil blad podczas pobierania historii faktur "))
        }
    }
}
export const fetchInvoiceHistoryByIdSuccess = data => ({
    type: 'UPDATE_FETCHED_INVOICE_DETAILS',
    payload: data
})

export function fetchInvoiceHistoryById(id) {
    return async dispatch => {
        try {
            await axios.get('http://localhost:3003/api/invoicehistory/' + id).then(response => {
                const tableDetails = JSON.parse(response.data.invoiceData.jsonEncodedInvoice);
                dispatch(fetchInvoiceHistoryByIdSuccess(tableDetails))
                dispatch(snackBarSuccess("Zaladowano dane z faktury "))
            }
            );
        }
        catch (e) {
            console.log(e);
            dispatch(snackBarError("Wystapil blad podczas ladowania danych z faktury "))
        }
    }
}

export const postInvoiceDataSuccess = response => ({
    type: 'POST_INVOICE_DATA_SUCCESS',
    payload: { response }
})
export function postInvoiceData(invoiceHistory) {
    return async dispatch => {
        try {
            await axios({
                method: 'post',
                url: 'http://localhost:3003/api/invoicehistory',
                data: {
                    "invoiceNumber": invoiceHistory.invoiceNumber,
                    "invoiceData": invoiceHistory.invoiceData
                }
            }
            ).then(response => {
                dispatch(postInvoiceDataSuccess(response))
                dispatch(fetchInvoiceHistoryList())
                dispatch(snackBarInfo("Poprawnie zapisano dane faktury"))
            }
            );
        }
        catch (e) {
            console.log(e);
            dispatch(snackBarError("Wystapil blad podczas zapisywania faktury"))

        }
    }
}

export function snackBarSuccess(message) {
    return {
        type: "SNACKBAR_SUCCESS",
        payload: message
    }
}

export function snackBarError(message) {
    return {
        type: "SNACKBAR_ERROR",
        payload: message
    }
}

export function snackBarInfo(message) {
    return {
        type: "SNACKBAR_INFO",
        payload: message
    }
}

export function snackBarClear() {
    return {
        type: "SNACKBAR_CLEAR"
    }
}