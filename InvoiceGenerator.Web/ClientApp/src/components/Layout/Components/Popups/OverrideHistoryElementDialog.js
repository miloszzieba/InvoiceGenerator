import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { OVERRIDE_HISTORY_TITLE,OVERRIDE_HISTORY, OVERRIDE_HISTORY_YES, OVERRIDE_HISTORY_NO } from "../../../../Resources/wordings_PL"

export class OverrideHistoryElementDialog extends React.Component {

    constructor(props) {
        super(props);
    }
   
    render() {
    return (
        <div>
            <Dialog
                open={this.props.open}
                onClose={this.props.overrideHistoryDisagree}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{OVERRIDE_HISTORY_TITLE}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {OVERRIDE_HISTORY}
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.overrideHistoryDisagree} color="primary">
                        {OVERRIDE_HISTORY_NO}
          </Button>
                    <Button onClick={this.props.overrideHistoryAgree} color="primary" autoFocus>
                        {OVERRIDE_HISTORY_YES}
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
}
