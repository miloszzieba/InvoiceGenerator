import React, { Component } from 'react';
import './styles/EditButtons.css'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DeleteIcon from '@material-ui/icons/Delete';

import { connect } from "react-redux";

//import {
//	removeItem,
//	moveRowUp,
//	moveRowDown
//} from "../../redux-legacy/actions";
import { removeItem, moveRowDown, moveRowUp } from "../../redux-toolkit/features/invoieTableSlice";

class EditButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {
	let {removeItem,moveRowUp,moveRowDown} = this.props
        return (
            <td>
                <a id="removeBin" title="Usuń" onClick={()=>removeItem(this.props.id)}><DeleteIcon/></a>
                <div className="up-down-buttons">
				
				<a id="moveRowUp" title="Przenieś do góry" onClick={() => moveRowUp(this.props.id)}><ArrowDropUpIcon id="arrowUpIcon"  /></a>
				<a id="moveRowDown" title="Przenieś do dołu" onClick={() => moveRowDown(this.props.id)}><ArrowDropDownIcon  id="arrowDownIcon" /></a>
				</div>

					
                </td>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        invoiceTable: state.invoiceTable,
    }
}
function mapDispatchToProps(dispatch) {
    return {
       removeItem: (id) => dispatch(removeItem(id)),
       moveRowUp: (id) => dispatch(moveRowUp(id)),
       moveRowDown: (id) => dispatch(moveRowDown(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditButton);
