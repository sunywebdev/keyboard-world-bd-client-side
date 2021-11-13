import {
	Autocomplete,
	Button,
	Container,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../context/useAuth";
import AlertSuccess from "../../../../SharedComponents/AlertSuccess/AlertSuccess";

const PageRols = () => {
	const { token } = useAuth();
	const [openSuccessMsg, setOpenSuccessMsg] = React.useState(false);
	const [successMsg, setSuccessMsg] = useState("");
	const [users, setUsers] = useState([]);
	useEffect(() => {
		fetch(`https://murmuring-fjord-25327.herokuapp.com/users`)
			.then((res) => res.json())
			.then((data) => setUsers(data));
	}, []);

	const { register, handleSubmit } = useForm();
	const onSubmit = (data) => {
		axios
			.put(`https://murmuring-fjord-25327.herokuapp.com/users/pageRole`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(function (response) {
				setOpenSuccessMsg(true);
				setSuccessMsg("User Role Changed Successfully");
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	return (
		<Container>
			<Typography
				classes={{ root: "color-1" }}
				sx={{ textAlign: "center", pb: 2, fontWeight: "bold" }}
				variant='h5'>
				Change or Addd Page Role
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid
					item
					xs={12}
					md={6}
					sx={{ textAlign: "left", mx: "auto", my: { xs: 5 } }}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							"& > :not(style)": { m: 1 },
						}}>
						<Autocomplete
							freeSolo
							id='free-solo-2-demo'
							disableClearable
							options={users.map((user) => user?.email)}
							renderInput={(params) => (
								<TextField
									{...register("email", { required: true })}
									{...params}
									label='Search Users'
									InputProps={{
										...params.InputProps,
										type: "search",
									}}
								/>
							)}
						/>
						<FormControl>
							<InputLabel id='demo-simple-select-autowidth-label'>
								Roles
							</InputLabel>
							<Select
								labelId='demo-simple-select-autowidth-label'
								id='demo-simple-select-autowidth'
								autoWidth
								label='Roles'
								{...register("userRole", { required: true })}>
								<MenuItem value='Admin'>Admin</MenuItem>
								<MenuItem value='User'>User</MenuItem>
							</Select>
						</FormControl>
						<Button
							type='submit'
							variant='contained'
							classes={{ root: "bg-1" }}>
							Change Role
						</Button>
					</Box>
				</Grid>
			</form>
			<AlertSuccess
				successMsg={successMsg}
				openSuccessMsg={openSuccessMsg}
				setOpenSuccessMsg={setOpenSuccessMsg}></AlertSuccess>
		</Container>
	);
};

export default PageRols;
