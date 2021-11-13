import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React from "react";

const AlertDialog = ({ alert, handleAlertAgreeClose, id, setAlert }) => {
	const handleAlertClose = () => {
		setAlert(false);
	};
	return (
		<Dialog
			open={alert}
			onClose={handleAlertClose}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'>
			<DialogTitle id='alert-dialog-title'>
				{"Do you agree with this action ?"}
			</DialogTitle>
			<DialogActions>
				<Button onClick={handleAlertClose}>Disagree</Button>
				<Button onClick={() => handleAlertAgreeClose(id)} autoFocus>
					Agree
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AlertDialog;
