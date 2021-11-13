import {
	Button,
	CircularProgress,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertSuccess from "../../../../SharedComponents/AlertSuccess/AlertSuccess";
import AlertDialog from "../../../../SharedComponents/AlertDialog/AlertDialog";

const AllBlogs = () => {
	const [blogs, setBlogs] = useState([]);
	const [alert, setAlert] = React.useState(false);
	const [openSuccessMsg, setOpenSuccessMsg] = React.useState(false);
	const [successMsg, setSuccessMsg] = useState("");
	useEffect(() => {
		fetch(`http://localhost:5000/blogs`)
			.then((res) => res.json())
			.then((data) => setBlogs(data));
	}, [blogs]);

	const handleAlertAgreeClose = (id) => {
		axios
			.delete(`http://localhost:5000/blogs/${id}`)
			.then(function (response) {
				setOpenSuccessMsg(true);
				setSuccessMsg("That Blog Deleted Successfully");
			})
			.catch(function (error) {
				console.log(error);
			});
		setAlert(false);
	};
	let count = 1;
	return (
		<div>
			<Typography
				classes={{ root: "color-1" }}
				sx={{ textAlign: "center", pb: 2, fontWeight: "bold" }}
				variant='h5'>
				All Blogs
			</Typography>
			<Grid item xs={12} md={12}>
				<TableContainer component={Paper}>
					<Table size='small' aria-label='a dense table'>
						<TableHead sx={{ th: { fontWeight: "bold" } }}>
							<TableRow>
								<TableCell align='left'>No</TableCell>
								<TableCell align='left'>UseName</TableCell>
								<TableCell align='left'>Blog Title</TableCell>
								<TableCell align='left'>Date</TableCell>
								<TableCell align='left'>Action</TableCell>
							</TableRow>
						</TableHead>
						{blogs?.length > 0 ? (
							<TableBody sx={{ td: { py: 2 } }}>
								{blogs?.map((blog) => (
									<>
										<TableRow
											key={blog?._id}
											sx={{
												"&:last-child td, &:last-child th": { border: 0 },
											}}>
											<TableCell align='left'>
												<Typography
													gutterBottom
													variant='button'
													component='div'
													classes={{ root: "color-1" }}
													sx={{ fontWeight: "bold" }}>
													{count++}
												</Typography>
											</TableCell>
											<TableCell align='left'>
												<Typography
													gutterBottom
													variant='button'
													component='div'
													classes={{ root: "color-1" }}
													sx={{ fontWeight: "bold" }}>
													{blog?.userName}
												</Typography>
											</TableCell>
											<TableCell align='left'>
												<Typography
													gutterBottom
													variant='button'
													component='div'
													classes={{ root: "color-1" }}
													sx={{ fontWeight: "bold" }}>
													{blog?.blogTitle}
												</Typography>
											</TableCell>

											<TableCell align='left'>
												<Typography
													gutterBottom
													variant='button'
													component='div'
													classes={{ root: "color-1" }}
													sx={{ fontWeight: "bold" }}>
													{blog?.blogTime}
												</Typography>
											</TableCell>
											<TableCell align='left'>
												<Button
													onClick={() => setAlert(true)}
													classes={{ root: "bg-1" }}
													sx={{ mx: 1 }}
													variant='contained'>
													<DeleteIcon />
												</Button>
											</TableCell>
										</TableRow>
										<AlertDialog
											alert={alert}
											setAlert={setAlert}
											handleAlertAgreeClose={handleAlertAgreeClose}
											id={blog?._id}></AlertDialog>
									</>
								))}
							</TableBody>
						) : (
							<TableHead sx={{ th: { fontWeight: "bold" } }}>
								<TableRow>
									<TableCell align='left'>
										<CircularProgress />
									</TableCell>
									<TableCell align='left'>
										<CircularProgress />
									</TableCell>
									<TableCell align='left'>
										<CircularProgress />
									</TableCell>
									<TableCell align='left'>
										<CircularProgress />
									</TableCell>
									<TableCell align='left'>
										<CircularProgress />
									</TableCell>
								</TableRow>
							</TableHead>
						)}
					</Table>
				</TableContainer>
				<AlertSuccess
					successMsg={successMsg}
					openSuccessMsg={openSuccessMsg}
					setOpenSuccessMsg={setOpenSuccessMsg}></AlertSuccess>
			</Grid>
		</div>
	);
};

export default AllBlogs;
