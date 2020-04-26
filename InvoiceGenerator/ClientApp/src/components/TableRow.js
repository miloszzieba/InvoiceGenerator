﻿import React, { Component } from 'react';
import { TableCell } from './TableCell';
import { EditButton } from './EditButton';

export class TableRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.value,
        }
    }

    render() {
        return (
            <tr> {this.renderCells()}
                <EditButton id={this.props.id} removeRow={this.props.onRemoveRow} moveRowUp={this.props.onMoveRowUp} moveRowDown={this.props.onMoveRowDown} />
            </tr>
        );
    }
    renderCells() {    
        return ['Name', 'Quantity', 'jm', 'NettoPrice', 'NettoValue', 'Vat', 'VatValue'].map(field => (
            <TableCell key={field} value={this.state.data[field]} onChange={value => this.onChange(value,field)} />
        ))
    }

    onChange(value, field) {
        this.state.data[field] = value;
        this.calculateData();

        this.props.onChange(this.state.data);
    }

    calculateData() {
        this.state.data['NettoValue'] = this.state.data['NettoPrice'] * this.state.data['Quantity'];
        this.props.onChange(this.state.data);
    }
}
