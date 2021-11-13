import {
	Button,
	CircularProgress,
	Grid,
	Rating,
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
import { Box } from "@mui/system";
import AlertSuccess from "../../../../SharedComponents/AlertSuccess/AlertSuccess";
import AlertDialog from "../../../../SharedComponents/AlertDialog/AlertDialog";

const AllReviews = () => {
	const [reviews, setReviews] = useState([]);
	const [alert, setAlert] = React.useState(false);
	const [openSuccessMsg, setOpenSuccessMsg] = React.useState(false);
	const [successMsg, setSuccessMsg] = useState("");
	useEffect(() => {
		fetch(`https://murmuring-fjord-25327.herokuapp.com/reviews`)
			.then((res) => res.json())
			.then((data) => setReviews(data));
	}, [reviews]);

	const handleAlertAgreeClose = (id) => {
		axios
			.delete(`https://murmuring-fjord-25327.herokuapp.com/reviews/${id}`)
			.then(function (response) {
				setOpenSuccessMsg(true);
				setSuccessMsg("That Review Deleted Successfully");
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
				All Reviews
			</Typography>
			<Grid item xs={12} md={12}>
				<TableContainer component={Paper}>
					<Table size='small' aria-label='a dense table'>
						<TableHead sx={{ th: { fontWeight: "bold" } }}>
							<TableRow>
								<TableCell align='left'>No</TableCell>
								<TableCell align='left'>Photo</TableCell>
								<TableCell align='left'>Name</TableCell>
								<TableCell align='center'>Rating</TableCell>
								<TableCell align='left'>Review</TableCell>
								<TableCell align='left'>Action</TableCell>
							</TableRow>
						</TableHead>
						{reviews?.length > 0 ? (
							<TableBody sx={{ td: { py: 1 } }}>
								{reviews?.map((review) => (
									<>
										<TableRow
											key={review?._id}
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
											<TableCell>
												<img
													src={review?.photoURL}
													alt=''
													width='50px'
													height='50px'
													style={{ borderRadius: "50%" }}
												/>
											</TableCell>
											<TableCell align='left'>
												<Typography
													gutterBottom
													variant='button'
													component='div'
													classes={{ root: "color-1" }}
													sx={{ fontWeight: "bold" }}>
													{review?.displayName}
												</Typography>
											</TableCell>
											<TableCell align='left'>
												<Box
													sx={{
														display: "flex",
														alignItems: "center",
													}}>
													<Rating
														name='half-rating-read'
														value={review?.userReviewStar}
														precision={0.1}
														readOnly
													/>
													<Box sx={{ ml: 2, fontWeight: "bold" }}>
														<span style={{ fontWeight: "bold", marginLeft: 4 }}>
															{review?.userReviewStar}/5
														</span>
													</Box>
												</Box>
											</TableCell>
											<TableCell align='left'>
												<Typography
													gutterBottom
													variant='button'
													component='div'
													classes={{ root: "color-1" }}
													sx={{ fontWeight: "bold" }}>
													{review?.userReview}
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
											id={review?._id}></AlertDialog>
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

export default AllReviews;
