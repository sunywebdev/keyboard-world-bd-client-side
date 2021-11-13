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
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import GoogleIcon from "@mui/icons-material/Google";
import Timer from "react-compound-timer";
import useAuth from "../../context/useAuth";
import signup from "../../Media/signup.jpg";

const SignUp = () => {
	const {
		user,
		createNewUserUsingEmailPassword,
		signInUsingGoogle,
		auth,
		error,
	} = useAuth();
	const { register, handleSubmit } = useForm();
	const history = useHistory();
	const location = useLocation();
	const errorMsg =
		error === "Firebase: Error (auth/email-already-in-use)."
			? "You already have an account"
			: "";
	const errorMsg2 =
		error ===
		"Firebase: Password should be at least 6 characters (auth/weak-password)."
			? "Password must be 6 charactre"
			: "";
	const handleGoogleSignUp = () => {
		signInUsingGoogle(history, location, setOpen);
	};

	const [open, setOpen] = React.useState(false);
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};
	const onSubmit = (data) => {
		createNewUserUsingEmailPassword(
			auth,
			data.email,
			data.password,
			data.displayName,
			data.photoURL,
			setOpen,
			history,
			location,
		);
	};
	console.log(user);
	return (
		<Container>
			<Grid
				justifyContent='space-between'
				container
				spacing={0}
				sx={{ display: "flex", alignItems: "center" }}>
				<Grid item xs={12} md={5} sx={{ textAlign: "left", my: { xs: 5 } }}>
					<Typography
						color='success.main'
						sx={{ textAlign: "center", pb: 2, fontWeight: "bold" }}
						variant='h5'>
						SignUp
					</Typography>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								"& > :not(style)": { m: 1 },
							}}>
							<TextField
								type='text'
								label='Your Name'
								variant='standard'
								{...register("displayName", { required: true })}
							/>
							<TextField
								type='email'
								label='Your Email'
								variant='standard'
								{...register("email", { required: true })}
							/>
							<TextField
								type='text'
								label='Your PhotoURL (Optional)'
								variant='standard'
								{...register("photoURL")}
							/>
							<TextField
								type='password'
								label='Your Password'
								variant='standard'
								{...register("password", { required: true })}
							/>
							<Typography
								color='error.main'
								sx={{ textAlign: "center", fontWeight: "bold" }}
								variant='body2'>
								{errorMsg}
								{errorMsg2}
							</Typography>
							<Button
								type='submit'
								color='success'
								variant='contained'
								sx={{ mt: 3 }}>
								SignUp
							</Button>
							<Button
								onClick={handleGoogleSignUp}
								color='success'
								variant='contained'
								sx={{ mt: 3 }}>
								<GoogleIcon fontSize='small' sx={{ mr: 1 }}></GoogleIcon>SignUp
								With Google
							</Button>
						</Box>
					</form>
					<div style={{ textAlign: "center" }}>
						<Link to='/login'>Already Have An Account?</Link>
					</div>
				</Grid>
				<Grid item md={6}>
					<img
						src={signup}
						alt=''
						style={{ width: "100%", maxHeight: "550px" }}
					/>
				</Grid>
			</Grid>
			{user?.email && !error && (
				<Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
					<Alert
						onClose={handleClose}
						severity='success'
						variant='filled'
						sx={{ width: "100%" }}>
						New User Created Successfully! Going Back To Desired Page in &nbsp;
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

export default SignUp;
