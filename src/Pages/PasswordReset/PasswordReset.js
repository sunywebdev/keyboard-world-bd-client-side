import {
	Alert,
	Button,
	Container,
	Grid,
	Snackbar,
	TextField,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import Timer from "react-compound-timer";
import useAuth from "../../context/useAuth";
import reset from "../../Media/reset.jpg";

const PasswordReset = () => {
	const { auth, error, resetPassword } = useAuth();
	const [state, setState] = useState([]);
	const [success, setSuccess] = useState();
	const location = useLocation();
	const history = useHistory();
	console.log(state);
	const errorMsg =
		error === "Firebase: Error (auth/user-not-found)."
			? "You Dont't Have Any Account"
			: "";
	const errorMsg2 =
		error === "Firebase: Error (auth/missing-email)."
			? "Enter A Email To Reset Password"
			: "";
	const [open, setOpen] = React.useState(false);
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};
	const { register, handleSubmit } = useForm();
	const onSubmit = (data) => {
		resetPassword(
			auth,
			data?.email,
			setState,
			setSuccess,
			data,
			history,
			location,
			setOpen,
		);
	};
	return (
		<Container>
			<Grid
				container
				spacing={0}
				direction='column'
				alignItems='center'
				justifyContent='center'
				style={{ minHeight: "100vh" }}>
				<Grid
					justifyContent='space-between'
					container
					spacing={0}
					sx={{ display: "flex", alignItems: "center" }}>
					<Grid item xs={12} md={5} sx={{ textAlign: "left", my: { xs: 5 } }}>
						<Typography
							classes={{ root: "color-1" }}
							sx={{ textAlign: "center", pb: 2, fontWeight: "bold" }}
							variant='h5'>
							Reset Password
						</Typography>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									"& > :not(style)": { m: 1 },
								}}>
								<TextField
									type='email'
									label='Your Email'
									{...register("email", { required: true })}
								/>
								<Typography
									color='error.main'
									sx={{ textAlign: "center", fontWeight: "bold" }}
									variant='body2'>
									{errorMsg || errorMsg2 ? errorMsg || errorMsg2 : success}
								</Typography>
								<Button
									type='submit'
									classes={{ root: "bg-1" }}
									variant='contained'
									sx={{ mt: 3 }}>
									Reset Password
								</Button>
							</Box>
						</form>
						<div style={{ textAlign: "center" }}>
							<Link to='/login'>Login To Your Account</Link>
						</div>
					</Grid>
					<Grid item md={6}>
						<img
							src={reset}
							alt=''
							style={{ width: "100%", maxHeight: "550px" }}
						/>
					</Grid>
				</Grid>
			</Grid>

			{!error && (
				<Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
					<Alert
						onClose={handleClose}
						severity='success'
						classes={{ root: "bg-1" }}
						variant='filled'
						sx={{ width: "100%" }}>
						Reset Request Successfull, Going Back To Desired Page in &nbsp;
						<Timer initialTime={5000} direction='backward'>
							{() => (
								<React.Fragment>
									<Timer.Seconds />
								</React.Fragment>
							)}
						</Timer>
					</Alert>
				</Snackbar>
			)}
		</Container>
	);
};

export default PasswordReset;
