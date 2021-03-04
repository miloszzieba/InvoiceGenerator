import React from 'react';
import '../Styles/SidePanel.css'
import Paper from '@material-ui/core/Paper';
import { connect } from "react-redux";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import PictureAsPdfOutlinedIcon from '@material-ui/icons/PictureAsPdfOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import Button from '@material-ui/core/Button';
import { Route } from 'react-router-dom'
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
//import { postInvoiceData } from "../../../redux-legacy/actions";
import { postInvoiceData, updateInvoiceHistory } from "../../../redux-toolkit/actions";
import { OverrideHistoryElementDialog } from './Popups/OverrideHistoryElementDialog'
import { INVOICE_GENERATE_BUTTON, INVOICE_SAVE_BUTTON, INVOICE_PREVIEW_BUTTON} from "../../../Resources/wordings_PL"

class SidePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showOverrideHistoryDialog: false,
        }
    }

    render() {

        return (
            <Paper elevation={6}>
                <div className="side-panel-container">
                    <Route render={({ history, location }) => (

                        <Button variant="outlined" color="primary" onClick={() => { location.pathname === "/" ? history.push('/preview') : history.push('/')}} style={{ margin: '10px', width: '60%' }}>
                            {location.pathname === "/" ? <span><VisibilityOutlinedIcon /> &nbsp; {INVOICE_PREVIEW_BUTTON}</span> : <span><CreateOutlinedIcon /> &nbsp; Edycja faktury</span>}
                        </Button>

                    )} />

                    <Button variant="outlined" color="primary" style={{ margin: '10px', width: '60%' }} onClick={() => this.saveData() }>
                        <SaveOutlinedIcon />&nbsp;&nbsp;  {INVOICE_SAVE_BUTTON}
                        </Button>
                    <OverrideHistoryElementDialog open={this.state.showOverrideHistoryDialog} overrideHistoryAgree={() => this.overrideHistoryAgree()} overrideHistoryDisagree={() => this.overrideHistoryDisagree()} />
                    
                    <Route render={({ location }) => (

                        <Button disabled={location.pathname !== "/preview"} variant="outlined" color="primary" onClick={() => {
                            let element = document.querySelector("#preview-container");
                            const pdf = new jsPDF();

                            if (pdf) {
                                html2canvas(element, {
                                    useCORS: true
                                })
                                    .then(canvas => {
                                        const imgData = canvas.toDataURL('image/png');
                                        let width = element.offsetWidth ;
                                        let height = element.offsetHeight;
                                        pdf.deletePage(1);
                                        pdf.addPage(width, height);
                                        pdf.addImage(imgData, 'PNG', 0, 0);
                                        pdf.save('invoice.pdf');
                                    });
                            } }} style={{ margin: '10px', width: '60%' }}>
                            <PictureAsPdfOutlinedIcon /> &nbsp; {INVOICE_GENERATE_BUTTON}
                        </Button>
                    )} />

                </div>
            </Paper>
        );
    }
    overrideHistoryAgree() {
        this.setState({ showOverrideHistoryDialog: false });
        const invoiceHistory = this.createInvoiceHistoryObject();
        this.props.updateInvoiceHistory(invoiceHistory);
    }

    overrideHistoryDisagree() { this.setState({ showOverrideHistoryDialog: false }); }
    saveData() {

        const invoiceHistory = this.createInvoiceHistoryObject();
        const matchElement = this.props.history.table.find(e => e.invoiceNumber === this.props.invoice.number)
        if (matchElement) {
            this.setState({ showOverrideHistoryDialog: true});
            return;
        }

        this.props.postInvoiceData(invoiceHistory);
    }

    createInvoiceHistoryObject() {
        const invoiceHistory = {
            invoiceNumber: this.props.invoice.number,
            invoiceData: {
                jsonEncodedInvoice: JSON.stringify({
                    invoice: this.props.invoice,
                    issuer: this.props.issuer,
                    recipant: this.props.recipant,
                    invoiceTable: this.props.invoiceTable,
                })
            }
        }
        return invoiceHistory;
    }
}



function mapDispatchToProps(dispatch) {
    return {
        postInvoiceData: (data) => dispatch(postInvoiceData(data)),
        updateInvoiceHistory: (data) => dispatch(updateInvoiceHistory(data))
    }
}

function mapStateToProps(state, ownProps) {
    return {
        invoice: state.invoice,
        issuer: state.issuer,
        recipant: state.recipant,
        invoiceTable: state.invoiceTable,
        history: state.history,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);