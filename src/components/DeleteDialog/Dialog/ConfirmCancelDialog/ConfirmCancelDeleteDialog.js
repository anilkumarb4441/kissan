import React from "react";
  import { connect } from "react-redux";
import { closeConfirmDeleteDialog } from "./action";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    color: "#0096D6",
    borderBottom: "1px solid #E0E0E0",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "#0096D6",
  },
});
const ColorButton = withStyles((theme) => ({
  root: {
    color: "white",
    backgroundColor: "#0096D6",
    "&:hover": {
      backgroundColor: "#0096D6",
    },
    borderRadius: "20px",
    width: "100px",
  },
}))(Button);

const CancelButton = withStyles((theme) => ({
  root: {
    color: "#0096D6",
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#fff",
    },
    borderRadius: "20px",
    width: "100px",
    borderColor: "#0096D6",
  },
}))(Button);
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const ConfirmCancelDeleteDialog = (props) => {
  const classes = useStyles();
  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth={"xs"}
        onClose={props.closeConfirmDeleteDialog}
        aria-labelledby="customized-dialog-title"
        open={props.modal}
      >
        <DialogTitle
					id='customized-dialog-title'
					onClose={props.closeConfirmDeleteDialog}
				>
				 Please Confirm
				</DialogTitle>
				<DialogContent>
					{props.button === 'save' ?   props.saveMessage : props.message }
				</DialogContent>
        <div style={{ padding: "0.5rem" }}>
          <span style={{ float: "right" }}>
            <CancelButton
              variant="outlined"
              className={classes.margin}
              size="small"
              onClick={() => props.closeConfirmDeleteDialog()}
            >
              NO
            </CancelButton>
            <ColorButton
              variant="contained"
              color="primary"
              className={classes.margin}
              size="small"
              onClick={() => 
                props.button === 'save' ? props.saveFunc() : props.func() }
            >
              YES
            </ColorButton>
          </span>
        </div>
      </Dialog>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
     modal: state.Delete.deleteModal,
     button: state.Delete.button,
  };
};

export default connect(mapStateToProps, {
  closeConfirmDeleteDialog,
})(ConfirmCancelDeleteDialog);
