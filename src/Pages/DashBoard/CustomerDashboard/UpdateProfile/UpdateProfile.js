import {
	Button,
	Card,
	CardContent,
	FormControl,
	Grid,
	MenuItem,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../../../../context/useAuth";
import AlertSuccess from "../../../../SharedComponents/AlertSuccess/AlertSuccess";

const UpdateProfile = () => {
	const { user } = useAuth();
	console.log(user?.email);
	const { register, handleSubmit, reset } = useForm({
		defaultValues: {
			address: "",
			contact: "",
			photoURL: "",
			age: "",
		},
	});
	const [openSuccessMsg, setOpenSuccessMsg] = React.useState(false);
	const [successMsg, setSuccessMsg] = React.useState("");

	const onSubmit = (data) => {
		axios
			.put(
				"https://murmuring-fjord-25327.herokuapp.com/users/updateUsers",
				data,
			)
			.then(function (response) {
				setOpenSuccessMsg(true);
				setSuccessMsg("	Profile Update Successful !");
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const [singleUser, setSingleUser] = useState([]);
	useEffect(() => {
		fetch(
			`https://murmuring-fjord-25327.herokuapp.com/singleUsers?email=${user?.email}`,
		)
			.then((res) => res.json())
			.then((data) => {
				setSingleUser(data);
				reset(data);
			});
	}, [reset, user?.email, openSuccessMsg]);

	return (
		<>
			<Grid justifyContent='space-between' container spacing={3}>
				<Grid item xs={12} md={6}>
					<Typography
						classes={{ root: "color-1" }}
						sx={{ textAlign: "center", pb: 2, fontWeight: "bold" }}
						variant='h5'>
						Update Your Profile
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
								label='User Name'
								value={singleUser?.userName}
								InputLabelProps={{
									shrink: true,
								}}
								{...register("userName")}
							/>
							<TextField
								type='text'
								label='Your Name'
								value={singleUser?.displayName}
								InputLabelProps={{
									shrink: true,
								}}
								{...register("displayName")}
							/>
							<TextField
								type='email'
								label='Your Email'
								value={singleUser?.email}
								InputLabelProps={{
									shrink: true,
								}}
								{...register("email", { required: true })}
							/>
							<TextField
								type='text'
								label='Your PhotoURL'
								InputLabelProps={{
									shrink: true,
								}}
								{...register("photoURL")}
							/>
							<FormControl sx={{ m: 1, textAlign: "left" }}>
								<Select
									displayEmpty
									{...register("gender", { required: true })}>
									<MenuItem>
										<em>{singleUser?.gender}</em>
									</MenuItem>
									<MenuItem value='Male'>Male</MenuItem>
									<MenuItem value='Female'>Female</MenuItem>
									<MenuItem value='Other'>Other</MenuItem>
								</Select>
							</FormControl>

							<TextField
								type='number'
								label='Age'
								InputLabelProps={{
									shrink: true,
								}}
								{...register("age", { required: true })}
							/>
							<TextField
								type='number'
								label='Contact'
								InputLabelProps={{
									shrink: true,
								}}
								{...register("contact", { required: true })}
							/>
							<TextField
								type='text'
								label='Address'
								multiline
								rows={4}
								InputLabelProps={{
									shrink: true,
								}}
								{...register("address", { required: true })}
							/>
							<Button
								type='submit'
								classes={{ root: "bg-1" }}
								variant='contained'
								sx={{ mt: 3 }}>
								Update Profile
							</Button>
						</Box>
					</form>
				</Grid>
				<Grid item xs={12} md={5}>
					<Card sx={{ maxWidth: 345 }}>
						<img
							height='170'
							src={singleUser?.photoURL}
							alt=''
							style={{ marginTop: 11 }}
						/>
						<CardContent>
							<Typography
								gutterBottom
								variant='h5'
								component='div'
								sx={{ fontWeight: "bold" }}
								classes={{ root: "color-1" }}>
								{singleUser?.displayName}
							</Typography>
							<TableContainer>
								<Table size='small' aria-label='a dense table'>
									<TableBody>
										<TableRow>
											<TableCell
												classes={{ root: "color-1" }}
												sx={{ fontWeight: "bold" }}
												align='left'>
												User Name
											</TableCell>
											<TableCell align='left'>{singleUser?.userName}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell
												classes={{ root: "color-1" }}
												sx={{ fontWeight: "bold" }}
												align='left'>
												Email
											</TableCell>
											<TableCell align='left'>{singleUser?.email}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell
												classes={{ root: "color-1" }}
												sx={{ fontWeight: "bold" }}
												align='left'>
												Gender
											</TableCell>
											<TableCell align='left'>{singleUser?.gender}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell
												classes={{ root: "color-1" }}
												sx={{ fontWeight: "bold" }}
												align='left'>
												Age
											</TableCell>
											<TableCell align='left'>{singleUser?.age}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell
												classes={{ root: "color-1" }}
												sx={{ fontWeight: "bold" }}
												align='left'>
												Contact
											</TableCell>
											<TableCell align='left'>{singleUser?.contact}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell
												classes={{ root: "color-1" }}
												sx={{ fontWeight: "bold" }}
												align='left'>
												Address
											</TableCell>
											<TableCell align='left'>{singleUser?.address}</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</TableContainer>
						</CardContent>
					</Card>
				</Grid>
			</Grid>

			<AlertSuccess
				successMsg={successMsg}
				openSuccessMsg={openSuccessMsg}
				setOpenSuccessMsg={setOpenSuccessMsg}></AlertSuccess>
		</>
	);
};

export default UpdateProfile;
