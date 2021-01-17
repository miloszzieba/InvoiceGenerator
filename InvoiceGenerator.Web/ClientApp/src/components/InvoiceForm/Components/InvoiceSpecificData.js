﻿import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";

//import {
//    setInvoiceDetails
//} from "../../../redux-legacy/actions";

import {
    setInvoiceDetails
} from "../../../redux-toolkit/features/invoiceDetailsSlice";
import '../styles/Common.css';

class InvoiceSpecificData extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { invoiceSpecificData } = this.props;
        return (
            <div className="flex-container">
                <TextField id="standard-basic" name="number" onChange={this.handleChange} value={invoiceSpecificData.number} label="numer faktury" variant="outlined" />

                <TextField id="date" name="issueDate" onChange={this.handleChange} label="data wystawienia" type="date" name="issueDate"  value={invoiceSpecificData.issueDate} style={{ marginTop: '20px' }} onChange={this.handleChange} variant="outlined" />

                <TextField id="date" name="sellingDate" required onChange={this.handleChange} label="data sprzedaży" type="date" value={invoiceSpecificData.sellingDate} style={{ marginTop: '20px' }} InputLabelProps={{ shrink: true }} onChange={this.handleChange} variant="outlined" />
                </div>
                )
    }

    handleChange = (e: Event) => {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
            const { name, value } = e.target;
            this.props.setInvoiceDetails(name, value);
        }
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setInvoiceDetails: (name, value) => dispatch(setInvoiceDetails({ name, value })),
    }
}

function mapStateToProps(state, ownProps) {
    return {
        invoiceSpecificData: state.invoiceSpecificData,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceSpecificData);