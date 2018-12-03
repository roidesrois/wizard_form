import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

export default class ConfirmationDialog extends Component {
    state = {
        open: true,
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleClose = () => {
        const { _closeDialog } = this.props;

        this.setState({ open: false });
        
        _closeDialog({ isDialogOpen: false });
    };

    render () {
        return (
            <div>
                {/*<Button onClick = { this.handleClickOpen }>Open alert dialog</Button>*/}
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open = { this.state.open }
                    onClose = { this.handleClose }
                    aria-labelledby = 'alert-dialog-title'
                    aria-describedby = 'alert-dialog-description'>
                    <DialogTitle id = 'alert-dialog-title'>{"Conditions of participation"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id = 'alert-dialog-description'>
                            Diqqət! Siz ........ layihəsində iştirakçı kimi qeydiyyatdan keçmək üçün səhifəyə daxil olmusunuz. Anket sorğusu ancaq iştirakçının özü tərəfindən doldurulmalıdır. Siz bu məlumatların doğruluğuna görə məsuliyyət daşıyırsınız. Anket sorğusunun məlumatlarında yanlışlıq və ya doğru olmayan məlumat aşkara çıxarsa sizin qeydiyyatınız ləğv olunacaq (etibarsız sayılacaq) və bu barədə Sizə bildiriş göndəriləcək. Təşəkkür edirik! Uğurlar!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {/*<Button onClick = { this.handleClose } color = 'primary'>*/}
                            {/*Disagree*/}
                        {/*</Button>*/}
                        <Button onClick = { this.handleClose } color = 'primary' autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
