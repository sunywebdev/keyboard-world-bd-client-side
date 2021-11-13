import { Typography, Grid, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<Grid
			container
			spacing={0}
			direction='column'
			alignItems='center'
			justifyContent='center'
			style={{ minHeight: "100vh" }}>
			<Grid item xs={12}>
				<Typography
					classes={{ root: "color-1" }}
					sx={{ textAlign: "center", pb: 2, fontWeight: "bold" }}
					variant='h2'>
					404 Not Found
				</Typography>
				<Typography
					classes={{ root: "color-1" }}
					sx={{ textAlign: "center", pb: 2, fontWeight: "bold" }}
					variant='h6'>
					Make sure you entered a right url
				</Typography>
				<Link exact to='/' style={{ textDecoration: "none" }}>
					<Button classes={{ root: "bg-1" }} variant='contained' sx={{ mt: 3 }}>
						Back To Home
					</Button>
				</Link>
			</Grid>
		</Grid>
	);
};

export default NotFound;
