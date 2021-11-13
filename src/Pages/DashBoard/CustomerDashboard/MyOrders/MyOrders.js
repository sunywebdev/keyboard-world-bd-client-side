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
import CloseIcon from "@mui/icons-material/Close";
import useAuth from "../../../../context/useAuth";
import AlertDialog from "../../../../SharedComponents/AlertDialog/AlertDialog";
import AlertSuccess from "../../../../SharedComponents/AlertSuccess/AlertSuccess";

const MyOrders = () => {
	const { user } = useAuth();
	const [orders, setOrders] = useState();
	const [alert, setAlert] = React.useState(false);
	const [openSuccessMsg, setOpenSuccessMsg] = React.useState(false);
	const [successMsg, setSuccessMsg] = useState("");
	const userName = user?.email?.split("@")[0];
	useEffect(() => {
		fetch(`http://localhost:5000/myOrders?userName=${userName}`)
			.then((res) => res.json())
			.then((data) => setOrders(data));
	}, [userName, orders]);
	const handleAlertAgreeClose = (id) => {
		axios
			.delete(`http://localhost:5000/orders/${id}`)
			.then(function (response) {
				setOpenSuccessMsg(true);
				setSuccessMsg("Your Order Deleted Successfully");
			})
			.catch(function (error) {
				console.log(error);
			});
		setAlert(false);
	};
	let count = 1;
	return (
		<div>
			<Grid item xs={12} md={12}>
				<Typography
					classes={{ root: "color-1" }}
					sx={{ textAlign: "center", pb: 2, fontWeight: "bold" }}
					variant='h5'>
					My Orders
				</Typography>
				<TableContainer component={Paper}>
					<Table size='small' aria-label='a dense table'>
						<TableHead sx={{ th: { fontWeight: "bold" } }}>
							<TableRow>
								<TableCell align='left'>No</TableCell>
								<TableCell align='left'>Product Photo</TableCell>
								<TableCell align='left'>Product ID</TableCell>
								<TableCell align='left'>Quantity</TableCell>
								<TableCell align='left'>Total</TableCell>
								<TableCell align='left'>Status</TableCell>
								<TableCell align='left'>Action</TableCell>
							</TableRow>
						</TableHead>
						{orders?.length > 0 ? (
							<TableBody sx={{ td: { py: 0 } }}>
								{orders?.map((order) => (
									<>
										<TableRow
											key={order?._id}
											sx={{
												"&:last-child td, &:last-child th": { border: 0 },
											}}>
											<TableCell align='left'>
												<Typography
													classes={{ root: "color-1" }}
													sx={{ fontWeight: "bold" }}>
													{count++}
												</Typography>
											</TableCell>
											<TableCell>
												<img
													src={order?.productPhoto}
													alt=''
													width='100px'
													height='100px'
												/>
											</TableCell>
											<TableCell align='left'>
												<Typography
													classes={{ root: "color-1" }}
													sx={{ fontWeight: "bold" }}>
													{order?.productId}
												</Typography>
											</TableCell>
											<TableCell align='left'>
												<Typography
													classes={{ root: "color-1" }}
													sx={{ fontWeight: "bold" }}>
													{order?.quantity}
												</Typography>
											</TableCell>
											<TableCell align='left'>
												<Typography
													classes={{ root: "color-1" }}
													sx={{ fontWeight: "bold" }}>
													{order?.total}
												</Typography>
											</TableCell>
											<TableCell align='left'>
												<Typography
													classes={{ root: "color-1" }}
													sx={{ fontWeight: "bold" }}>
													{order?.status}
												</Typography>
											</TableCell>
											<TableCell align='left'>
												<Button
													onClick={() => setAlert(true)}
													classes={{ root: "bg-1" }}
													sx={{ mx: 1 }}
													variant='contained'>
													<CloseIcon />
												</Button>
											</TableCell>
										</TableRow>
										<AlertDialog
											alert={alert}
											setAlert={setAlert}
											handleAlertAgreeClose={handleAlertAgreeClose}
											id={order?._id}></AlertDialog>
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
									<TableCell align='left'>
										<CircularProgress />
									</TableCell>
								</TableRow>
							</TableHead>
						)}
					</Table>
				</TableContainer>
			</Grid>
			<AlertSuccess
				successMsg={successMsg}
				openSuccessMsg={openSuccessMsg}
				setOpenSuccessMsg={setOpenSuccessMsg}></AlertSuccess>
		</div>
	);
};

export default MyOrders;
