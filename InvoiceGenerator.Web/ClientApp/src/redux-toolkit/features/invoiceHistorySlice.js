import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { INVOICE_HISTORY_URL } from '../../Resources/endpoints_LOCAL'
import { FETCH_INVOICE_HISTORY_BY_ID_FULLFILLED, FETCH_INVOICE_HISTORY_BY_ID_ERROR } from '../../Resources/wordings_PL'
import { updateInvoiceData } from '../actions'
import { snackBarSuccess, snackBarError } from "./userInterfaceSlice";


const initialState = {
    table: [],
    isLoading: false,
    error: "",
    selectedListItemIndex: -1
}

export const fetchInvoiceHistoryList = createAsyncThunk(
    'invoiceHistory/fetchInvoiceHistoryList',
    async () => {
        return await axios.get(INVOICE_HISTORY_URL)
            .then(response => response.data)
    }
);

export function fetchInvoiceHistoryById(id) {
    return async dispatch => {
        try {
            await axios.get(INVOICE_HISTORY_URL + id).then(response => {
                const tableDetails = JSON.parse(response.data.invoiceData.jsonEncodedInvoice);
                dispatch(updateInvoiceData(tableDetails))
                dispatch(snackBarSuccess(FETCH_INVOICE_HISTORY_BY_ID_FULLFILLED + response.data.invoiceNumber))
            }
            );
        }
        catch (e) {
            console.log(e);
            dispatch(snackBarError(FETCH_INVOICE_HISTORY_BY_ID_ERROR))
        }
    }
}

const invoiceHistorySlice = createSlice({
    name: 'invoiceHistory',
    initialState: initialState,
    reducers: {
        selectListItem(state, action) {
            state.selectedListItemIndex = action.payload
        }
    },
    extraReducers: {
        [fetchInvoiceHistoryList.pending]: (state) => {
            state.isLoading = true
        },
        [fetchInvoiceHistoryList.fulfilled]: (state, action) => {
            state.isLoading = false
            state.table = action.payload
        },
        [fetchInvoiceHistoryList.rejected]: (state ) => {
            state.isLoading = false
        }
    }

});



export const { selectListItem, getHistoryList, getHistoryListSuccess, getHistoryListFailure } = invoiceHistorySlice.actions

export default invoiceHistorySlice.reducer