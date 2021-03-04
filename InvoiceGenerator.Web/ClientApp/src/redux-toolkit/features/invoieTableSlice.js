import { createSlice } from '@reduxjs/toolkit'
import { calculateRow, calculateSummaryTable } from "../../Services/CalculationService";
import { AmountInWordsService } from "../../Services/AmountInWordsService";
import { updateInvoiceData } from '../actions'

const newRow = (id) => {
    return {
        "id": id,
        "Name": "",
        "Quantity": "",
        "jm": "",
        "NettoPrice": "",
        "NettoValue": 0,
        "Vat": "23",
        "VatValue": 0,
        "GrossValue": 0
    }
}
const initialStateRow = {
    "id": 1,
    "Name": "",
    "Quantity": "",
    "jm": "",
    "NettoPrice": "",
    "NettoValue": 0,
    "Vat": "23",
    "VatValue": 0,
    "GrossValue": 0
}

const initialState = {
    table: [initialStateRow],
    NettoValueSum: 0,
    VatValueSum: 0,
    GrossValueSum: 0,
    AmountInWords: "",
    editing: true
}

const invoiceTableSlice = createSlice({
    name: 'invoiceTable',
    initialState: initialState,
    reducers: {
        addItem(state) {
            state.table.push(newRow(state.table.length + 1))
        },
        removeItem(state, action) {
            state.table.splice(action.payload, 1);
            state.table.map((item, i) => { item.id = i });
        },
        updateItem(state, action) {
            let { id, field, value } = action.payload;

            state.table[id][field] = value;

            if (field === 'Quantity' || field === 'NettoPrice' || field === 'Vat') {
                let summaryValues = { NettoValueSum: 0, VatValueSum: 0, GrossValueSum: 0 };
                let calcResult = calculateRow(state.table[id].NettoPrice, state.table[id].Quantity, state.table[id].Vat);
                state.table[id].GrossValue = calcResult.GrossValue;
                state.table[id].VatValue = calcResult.VatValue;
                state.table[id].NettoValue = calcResult.NettoValue;
                summaryValues = calculateSummaryTable(state.table);

                let amountInWords = AmountInWordsService(summaryValues.NettoValueSum);

                state.NettoValueSum = summaryValues.NettoValueSum.toFixed(2);
                state.VatValueSum = summaryValues.VatValueSum.toFixed(2);
                state.GrossValueSum = summaryValues.GrossValueSum.toFixed(2);
                state.AmountInWords = amountInWords
            }
        },
        moveRowUp(state, action) {
            if (action.payload !== 0) {
                let tempRow = state.table[action.payload - 1];
                state.table[action.payload - 1] = state.table[action.payload];
                state.table[action.payload] = tempRow;
            }
        },
        moveRowDown(state, action) {
            if (action.payload !== state.table.length-1) {

                let tempRow = state.table[action.payload + 1];
                state.table[action.payload + 1] = state.table[action.payload];
                state.table[action.payload] = tempRow;
            }
        },
        changeEditingState(state, action) {
            state.editing = action.payload;
        }

    },
        extraReducers: {
            [updateInvoiceData]: (state, action) => {
                state.table = action.payload.invoiceTable.table
                state.AmountInWords = action.payload.invoiceTable.AmountInWords
                state.GrossValueSum = action.payload.invoiceTable.GrossValueSum
                state.NettoValueSum = action.payload.invoiceTable.NettoValueSum
                state.VatValueSum = action.payload.invoiceTable.VatValueSum
                state.editing = false
            }
        }
    
});




export const { addItem, removeItem, updateItem, moveRowDown, moveRowUp, changeEditingState } = invoiceTableSlice.actions

export default invoiceTableSlice.reducer