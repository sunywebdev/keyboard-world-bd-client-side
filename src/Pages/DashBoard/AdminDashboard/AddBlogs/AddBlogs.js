import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AlertSuccess from "../../../../SharedComponents/AlertSuccess/AlertSuccess";
import useAuth from "../../../../context/useAuth";

const AddBlogs = () => {
	const { user } = useAuth();
	const [openSuccessMsg, setOpenSuccessMsg] = React.useState(false);
	const [successMsg, setSuccessMsg] = React.useState("");
	const { register, handleSubmit, reset } = useForm();
	const onSubmit = (data) => {
		axios
			.post("https://murmuring-fjord-25327.herokuapp.com/blogs", data)
			.then(function (response) {
				setOpenSuccessMsg(true);
				setSuccessMsg("Successfully added new Blog !");
				reset();
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	const [value, setValue] = React.useState(new Date());

	const handleChange = (newValue) => {
		setValue(newValue);
	};
	const userName = user?.email.split("@")[0];
	return (
		<Container>
			<Grid justifyContent='space-between' container spacing={0}>
				<Grid
					item
					xs={12}
					md={6}
					sx={{ textAlign: "left", mx: "auto", my: { xs: 5 } }}>
					<Typography
						classes={{ root: "color-1" }}
						sx={{ textAlign: "center", pb: 2, fontWeight: "bold" }}
						variant='h5'>
						Add New Blog
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
								label='Blog ID'
								{...register("blogId", { required: true })}
							/>
							<TextField
								type='text'
								label='Blogger Photo'
								defaultValue={user?.photoURL}
								{...register("bloggerPhoto", { required: true })}
							/>
							<TextField
								type='text'
								label='Blogger UserName'
								value={userName}
								{...register("bloggerName", { required: true })}
							/>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DateTimePicker
									label='Date&Time picker'
									value={value}
									onChange={handleChange}
									renderInput={(params) => (
										<TextField
											{...params}
											{...register("blogTime", { required: true })}
										/>
									)}
								/>
							</LocalizationProvider>
							<TextField
								type='text'
								label='Blog Photo'
								{...register("blogPhoto", { required: true })}
							/>
							<TextField
								type='text'
								label='Blog Title'
								{...register("blogTitle", { required: true })}
							/>

							<TextField
								id='outlined-multiline-static'
								label='Blog Details'
								multiline
								rows={5}
								{...register("blogDetails", { required: true })}
							/>

							<Button
								type='submit'
								classes={{ root: "bg-1" }}
								variant='contained'
								sx={{ mt: 3 }}>
								Add Blog
							</Button>
						</Box>
					</form>
				</Grid>
			</Grid>
			<AlertSuccess
				successMsg={successMsg}
				openSuccessMsg={openSuccessMsg}
				setOpenSuccessMsg={setOpenSuccessMsg}></AlertSuccess>
		</Container>
	);
};
export default AddBlogs;
