import React from 'react';
import './Template1.css';
import { connect } from "react-redux";

function Template1(props) {

    let style = {
        gridTemplateAreas: '"invoiceSpecificData invoiceSpecificData" "recipantDetails issuerDetails" "invoiceTableSection invoiceTableSection" "signSection summaryTableSection" "signSection amountInWordsSection"',
    };

    return (
        <div id="template1-container">
            <h1 class="invoice-header">Faktura VAT Nr {props.invoice.number}</h1>
            <div class="invoice-preview-container" style={style}>

                <div class="invoiceSpecificData" style={style.invoiceSpecificData} >
                    <div>Data wystawienia: {props.invoice.issueDate}</div>
                    <div>Data sprzedaży: {props.invoice.sellingDate}</div>
                </div>
                <div class="issuerDetails" >
                    <div>Dane sprzedawcy </div>
                    <div>Nazwa firmy: {props.issuer.companyName}</div>
                    <div>Adress: {props.issuer.address}</div>
                </div>
                <div class="recipantDetails" >
                    <div>Dane nabywcy </div>
                    <div>Nazwa firmy: {props.recipant.companyName}</div>
                    <div>Adress: {props.recipant.address}</div>
                </div>



                <div class="invoiceTableSection" >
                    <table className="invoiceTable">
                        <thead>
                            <tr>
                            <th>Nazwa</th>
                            <th>Ilość</th>
                            <th>jm</th>
                            <th>Cena jednostkowa netto</th>
                            <th>Wartość netto</th>
                            <th>Vat</th>
                            <th>Wartość vat</th>
                            <th>Wartość brutto</th>

                            </tr>
                        </thead>
                        <tbody>
                            {renderRows(props.invoiceTable.table)}
                        </tbody>
                    </table>
                </div>
                <div class="summaryTableSection" >
                    <table id="summary-table" className="table table-borderless table-responsive-sm table-hover">
                        <thead>
                            <tr>
                                <th> Wartość netto</th>
                                <th>Vat </th> 
                                <th> Wartość brutto	</th> 

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>{props.invoiceTable.NettoValueSum}</td>
                            <td>{props.invoiceTable.VatValueSum}</td>
                            <td>{props.invoiceTable.GrossValueSum}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="amountInWordsSection" >
                    {props.invoiceTable.AmountInWords}
                </div>
            </div>
        </div>

    );
}

const renderRows = (arr) => {
    return arr.map((data, i) => (
        <tr key={i}>
            <td>{data.Name}</td>
            <td>{data.Quantity}</td>
            <td>{data.jm}</td>
            <td>{data.NettoPrice}</td>
            <td>{data.NettoValue}</td>
            <td>{data.Vat}</td>
            <td>{data.VatValue}</td>
            <td>{data.GrossValue}</td>
        </tr>
    ))
}


const mapStateToProps = (state, ownProps) => {
    return {
        invoice: state.invoice,
        issuer: state.issuer,
        recipant: state.recipant,
        invoiceTable: state.invoiceTable,
    }
}


export default connect(
    mapStateToProps
)(Template1)
