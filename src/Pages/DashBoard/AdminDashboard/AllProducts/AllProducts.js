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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import AlertDialog from "../../../../SharedComponents/AlertDialog/AlertDialog";
import AlertSuccess from "../../../../SharedComponents/AlertSuccess/AlertSuccess";

const AllProducts = () => {
	const [products, setProducts] = useState([]);
	const [alert, setAlert] = React.useState(false);
	const [openSuccessMsg, setOpenSuccessMsg] = React.useState(false);
	const [successMsg, setSuccessMsg] = useState("");
	useEffect(() => {
		fetch(`https://murmuring-fjord-25327.herokuapp.com/products`)
			.then((res) => res.json())
			.then((data) => setProducts(data));
	}, [products]);

	const handleAlertAgreeClose = (id) => {
		axios
			.delete(`https://murmuring-fjord-25327.herokuapp.com/products/${id}`)
			.then(function (response) {
				setOpenSuccessMsg(true);
				setSuccessMsg("Your Product Deleted Successfully");
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
				All Products
			</Typography>
			<Grid item xs={12} md={12}>
				<TableContainer component={Paper}>
					<Table size='small' aria-label='a dense table'>
						<TableHead sx={{ th: { fontWeight: "bold" } }}>
							<TableRow>
								<TableCell align='left'>No</TableCell>
								<TableCell align='left'>Photo</TableCell>
								<TableCell align='left'>Name</TableCell>
								<TableCell align='left'>price</TableCell>
								<TableCell align='left'>Action</TableCell>
							</TableRow>
						</TableHead>
						{products?.length > 0 ? (
							<TableBody sx={{ td: { py: 0 } }}>
								{products?.map((product) => (
									<>
										<TableRow
											key={product?._id}
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
													src={product?.productPhoto}
													alt=''
													width='100px'
													height='100px'
												/>
											</TableCell>
											<TableCell align='left'>
												<Typography
													gutterBottom
													variant='button'
													component='div'
													classes={{ root: "color-1" }}
													sx={{ fontWeight: "bold" }}>
													{product?.productName}
												</Typography>
											</TableCell>
											<TableCell align='left'>
												<Typography
													gutterBottom
													variant='button'
													component='div'
													classes={{ root: "color-1" }}
													sx={{ fontWeight: "bold" }}>
													{product?.productPrice} ৳
												</Typography>
											</TableCell>
											<TableCell align='left'>
												<ButtonGroup>
													<Link to={`/dashboard/editproduct/${product?._id}`}>
														<Button
															classes={{ root: "bg-1" }}
															variant='contained'>
															<EditIcon />
														</Button>
													</Link>
													<Button
														onClick={() => setAlert(true)}
														classes={{ root: "bg-1" }}
														sx={{ mx: 1 }}
														variant='contained'>
														<DeleteIcon />
													</Button>
												</ButtonGroup>
											</TableCell>
										</TableRow>
										<AlertDialog
											alert={alert}
											setAlert={setAlert}
											handleAlertAgreeClose={handleAlertAgreeClose}
											id={product?._id}></AlertDialog>
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

export default AllProducts;
