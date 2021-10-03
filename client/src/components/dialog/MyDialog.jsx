import "./myDialog.css";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const MyDialog = (props) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClickClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props?.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props?.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickClose} color="primary">
          No
        </Button>
        <Button onClick={handleClickClose} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MyDialog;
