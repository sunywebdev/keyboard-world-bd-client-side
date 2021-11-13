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
import login from "../../Media/login.jpg";

const Login = () => {
	const { signInUsingGoogle, signInWithEmailPassword, auth, error, user } =
		useAuth();
	const location = useLocation();
	const history = useHistory();
	console.log(error);
	const [open, setOpen] = React.useState(false);
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};
	const errorMsg =
		error === "Firebase: Error (auth/wrong-password)."
			? "Your password is Worng"
			: "";
	const errorMsg2 =
		error === "Firebase: Error (auth/user-not-found)."
			? "You don't have any account"
			: "";
	const handleGoogleLogin = () => {
		signInUsingGoogle(history, location, setOpen);
	};
	const { register, handleSubmit } = useForm();
	const onSubmit = (data) => {
		signInWithEmailPassword(
			auth,
			data.email,
			data.password,
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
							Login
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
								<TextField
									type='password'
									label='Your Password'
									{...register("password", { required: true })}
								/>
								<div style={{ textAlign: "left" }}>
									<Link to='/resetpassword'>Forgot Your Password?</Link>
								</div>
								<Typography
									color='error.main'
									sx={{ textAlign: "center", fontWeight: "bold" }}
									variant='body2'>
									{errorMsg}
									{errorMsg2}
								</Typography>
								<Button
									type='submit'
									classes={{ root: "bg-1" }}
									variant='contained'
									sx={{ mt: 3 }}>
									Login
								</Button>
								<Button
									onClick={handleGoogleLogin}
									classes={{ root: "bg-1" }}
									variant='contained'
									sx={{ mt: 3 }}>
									<GoogleIcon fontSize='small' sx={{ mr: 1 }}></GoogleIcon>Login
									With Google
								</Button>
							</Box>
						</form>
						<div style={{ textAlign: "center" }}>
							<Link to='/signup'>Don't Have An Account?</Link>
						</div>
					</Grid>
					<Grid item md={6}>
						<img
							src={login}
							alt=''
							style={{ width: "100%", maxHeight: "550px" }}
						/>
					</Grid>
				</Grid>
			</Grid>
			{user?.email && !error && (
				<Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
					<Alert
						onClose={handleClose}
						severity='success'
						classes={{ root: "bg-1" }}
						variant='filled'
						sx={{ width: "100%" }}>
						Login Successfull, Going Back To Desired Page in &nbsp;
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

export default Login;
