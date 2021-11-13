import { Alert, Snackbar } from "@mui/material";
import React from "react";

const AlertSuccess = ({ successMsg, openSuccessMsg, setOpenSuccessMsg }) => {
	const handleSucessClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenSuccessMsg(false);
	};
	console.log(successMsg, openSuccessMsg);
	return (
		<Snackbar
			open={openSuccessMsg}
			autoHideDuration={5000}
			onClose={handleSucessClose}>
			<Alert
				onClose={handleSucessClose}
				severity='success'
				variant='filled'
				sx={{ width: "100%" }}>
				{successMsg}
			</Alert>
		</Snackbar>
	);
};

export default AlertSuccess;
