import {
	CircularProgress,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";

const AllUsers = () => {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		fetch(`https://murmuring-fjord-25327.herokuapp.com/users`)
			.then((res) => res.json())
			.then((data) => setUsers(data));
	}, []);
	let count = 1;
	return (
		<div>
			<Typography
				classes={{ root: "color-1" }}
				sx={{ textAlign: "center", pb: 2, fontWeight: "bold" }}
				variant='h5'>
				All Users
			</Typography>
			<Grid item xs={12} md={12}>
				<Paper className='container'>
					<Table size='small' aria-label='a dense table'>
						<TableHead sx={{ th: { fontWeight: "bold" } }}>
							<TableRow>
								<TableCell align='left'>No</TableCell>
								<TableCell align='left'>Photo</TableCell>
								<TableCell align='left'>Name</TableCell>
								<TableCell align='left'>Email</TableCell>
								<TableCell align='left'>Gender</TableCell>
								<TableCell align='left'>Age</TableCell>
								<TableCell align='left'>Contact</TableCell>
								<TableCell align='left'>Address</TableCell>
							</TableRow>
						</TableHead>
						{users?.length > 0 ? (
							<TableBody sx={{ td: { py: 1 } }}>
								{users.map((user) => (
									<TableRow
										key={user?._id}
										sx={{
											"&:last-child td, &:last-child th": { border: 0 },
										}}>
										<TableCell align='left'>{count++}</TableCell>
										<TableCell>
											<img
												src={user?.photoURL || "N/A"}
												alt=''
												width='25px'
												height='25px'
												style={{ borderRadius: "50%" }}
											/>
										</TableCell>
										<TableCell align='left'>
											{user?.displayName || "N/A"}
										</TableCell>
										<TableCell align='left'>{user?.email || "N/A"}</TableCell>
										<TableCell align='left'>{user?.gender || "N/A"}</TableCell>
										<TableCell align='left'>{user?.age || "N/A"}</TableCell>
										<TableCell align='left'>{user?.contact || "N/A"}</TableCell>
										<TableCell align='left'>{user?.address || "N/A"}</TableCell>
									</TableRow>
								))}
							</TableBody>
						) : (
							<TableHead sx={{ th: { fontWeight: "bold" } }}>
								<TableRow>
									<TableCell align='left'>
										N/A
									</TableCell>
									<TableCell align='left'>
										N/A
									</TableCell>
									<TableCell align='left'>
										N/A
									</TableCell>
									<TableCell align='left'>
										N/A
									</TableCell>
									<TableCell align='left'>
										N/A
									</TableCell>
									<TableCell align='left'>
										N/A
									</TableCell>
									<TableCell align='left'>
										N/A
									</TableCell>
									<TableCell align='left'>
										N/A
									</TableCell>
								</TableRow>
							</TableHead>
						)}
					</Table>
				</Paper>
			</Grid>
		</div>
	);
};

export default AllUsers;
