﻿import React, { Component } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap'
import  InvoiceIssuer  from './InvoiceIssuer'
import  InvoiceReceipant  from './InvoiceReceipant'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import PictureAsPdfOutlinedIcon from '@material-ui/icons/PictureAsPdfOutlined';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import  InvoicePreview  from '../Preview/InvoicePreview'

import { connect } from "react-redux";
import './styles/InvoiceForm.css'
import {
    setPreviewInvoice
} from "../../actions";



type Props = {
   setPreviewInvoice: Function,
   previewInvoice:boolean
};


 class InvoiceForm extends Component {

	constructor(props:Props) {
		super(props);
		this.state={
			invoiceFormConfig: this.props.formConfig,
			invoiceFormData: this.props.formData

        }
	}

	render() {
		
		return (

		 <Grid container direction={'row'} align="center"  item xs={12} spacing={15}>

			<Grid item xs={12} sm={4}>
			  <Paper elevation ={3}>
			  <Box p={3}>
					<InvoiceIssuer companyDataConfig={this.state.invoiceFormConfig.CompanyInputs} />
			  </Box>

			</Paper>
			</Grid>
			<Grid item xs={12} sm={4} align="center">
			<Box display={{ xs: 'none', sm: 'block' }} fontWeight="fontWeightBold" fontSize="h4.fontSize">
			Faktura VAT

			</Box>
		<Button
        variant="contained"
        color="primary"
        size="large"
		onClick={()=>this.props.setPreviewInvoice(true)}
        startIcon={<PictureAsPdfOutlinedIcon />}>
        Generuj PDF
      </Button>
	   <Modal
        open={this.props.previewInvoice}
        onClose={()=>this.props.setPreviewInvoice(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <InvoicePreview/>
      </Modal>
			</Grid>
			<Grid item xs={12} sm={4}>
			 <Paper elevation ={3}>
			  <Box p={3} >
					<InvoiceReceipant  companyDataConfig={this.state.invoiceFormConfig.CompanyInputs}  />
				  </Box>

			</Paper>
			</Grid>	
			</Grid>
			)
	}

}

function mapDispatchToProps(dispatch) {
    return {
        setPreviewInvoice: (previewInvoice) => dispatch(setPreviewInvoice(previewInvoice)),
    }
}

function mapStateToProps(state, ownProps) {
    return {
        previewInvoice: state.previewInvoice,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceForm);

