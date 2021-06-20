import React from 'react';
import Button from 'components/standard/button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme=>{
    return {
        paper:{
        },
    };
});
export default function FormDialog({title, body,okButton, handleClose, open, children }) {
    const classes = useStyles();
    const template = children;

    return (
        <Dialog open={open} onClose={handleClose} fullWidth classes={classes} >

            {template ? template({title, body, okButton, handleClose}):
                <>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogContent>
                        {body}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant='contained'>
                            Cancel
                        </Button>
                        {okButton}
                    </DialogActions>
                </>}

        </Dialog>
    );
}