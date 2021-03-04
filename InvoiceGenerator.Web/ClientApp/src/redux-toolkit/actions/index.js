import { createAction } from '@reduxjs/toolkit';
import { INVOICE_HISTORY_URL } from '../../Resources/endpoints_LOCAL'
import { fetchInvoiceHistoryList } from "../features/invoiceHistorySlice";
//import { snackBarSuccess, snackBarError } from "../../redux-legacy/actions";
import { snackBarSuccess, snackBarError } from "../features/userInterfaceSlice";

import axios from 'axios';
export const updateInvoiceData = createAction('updateInvoiceData');


export function postInvoiceData(invoiceHistory) {
    return async dispatch => {
        try {
            await axios({
                method: 'post',
                url: INVOICE_HISTORY_URL,
                data: {
                    "invoiceNumber": invoiceHistory.invoiceNumber,
                    "invoiceData": invoiceHistory.invoiceData
                }
            }
            ).then(response => {
                //dispatch(postInvoiceDataSuccess(response))
                dispatch(fetchInvoiceHistoryList())
                dispatch(snackBarSuccess("Poprawnie zapisano dane faktury"))
            }
            );
        }
        catch (e) {
            console.log(e);
            dispatch(snackBarError("Wystapil blad podczas zapisywania faktury"))

        }
    }
}

export function deleteInvoiceHistory(id) {
    return async dispatch => {
        try {
            await axios({
                method: 'DELETE',
                url: INVOICE_HISTORY_URL +id,

            }
            ).then(response => {
                dispatch(fetchInvoiceHistoryList())
                dispatch(snackBarSuccess("Poprawnie usunięto historię faktury"))
            }
            );
        }
        catch (e) {
            console.log(e);
            dispatch(snackBarError("Wystapil blad podczas usuwania faktury"))

        }
    }
}

export function updateInvoiceHistory(invoiceHistory) {
    return async dispatch => {
        try {
            await axios({
                method: 'PUT',
                url: INVOICE_HISTORY_URL,
                data: {
                    "invoiceNumber": invoiceHistory.invoiceNumber,
                    "invoiceData": invoiceHistory.invoiceData
                }

            }
            ).then(response => {
                dispatch(fetchInvoiceHistoryList())
                dispatch(snackBarSuccess("Poprawnie zaktualizowano historię faktury"))
            }
            );
        }
        catch (e) {
            console.log(e);
            dispatch(snackBarError("Wystapil blad podczas aktualizowania historii faktury"))

        }
    }
}