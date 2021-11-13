import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, ButtonGroup, CardActions, Divider } from "@mui/material";
import { Box } from "@mui/system";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../../context/useAuth";
import AlertSuccess from "../AlertSuccess/AlertSuccess";

const ProductCard = ({ product }) => {
	const { user } = useAuth();
	const [quantity, setQuantity] = useState(0);
	const [openSuccessMsg, setOpenSuccessMsg] = React.useState(false);
	const [successMsg, setSuccessMsg] = useState("");
	const total = product?.productPrice * quantity || 0;
	const userName = user?.email?.split("@")[0];
	const productPhoto = product?.productPhoto;
	const productId = product?.productId;
	const submitOrder = () => {
		axios
			.post("https://murmuring-fjord-25327.herokuapp.com/orders", {
				productId,
				productPhoto,
				quantity,
				total,
				userName,
				status: "Pending",
			})
			.then(function (response) {
				setOpenSuccessMsg(true);
				setSuccessMsg("Your Order Placed Successfully");
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	return (
		<>
			<Card
				classes={{ root: "card" }}
				sx={{
					maxWidth: 305,
					textAlign: "left",
					height: "100%",
					display: "flex",
					flexWrap: "wrap",
					alignContent: "space-between",
					borderRadius: "15px",
				}}>
				<CardMedia
					component='img'
					height='230'
					sx={{ mt: -2 }}
					image={product?.productPhoto}
				/>
				<Divider />
				<CardContent sx={{ pb: 0, mt: -5, px: 1.5 }}>
					<Typography
						gutterBottom
						component='div'
						classes={{ root: "color-1" }}
						sx={{ fontWeight: "bold" }}>
						{product?.productName}
					</Typography>
					<Typography variant='body2'>
						<ul style={{ paddingLeft: 21, margin: "5px 0 5px 0" }}>
							<li>{product?.productInfo1}</li>
							<li>{product?.productInfo2}</li>
							<li>{product?.productInfo3}</li>
							<li>{product?.productInfo4} </li>
						</ul>
					</Typography>
				</CardContent>
				<Typography
					gutterBottom
					variant='h5'
					component='div'
					classes={{ root: "color-1" }}
					sx={{ fontWeight: "bold", textAlign: "center", mx: "auto", mb: 0 }}>
					{product?.productPrice} ৳
				</Typography>
				<CardActions sx={{ pb: 1.5, mx: "auto" }}>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								mr: 1,
								border: "2px solid #6047ec",
								borderRadius: "11px 0 0 11px",
							}}>
							<input
								type='number'
								value={quantity}
								className='color-1'
								style={{
									maxWidth: 40,
									height: 29,
									borderRadius: "11px 0 0 11px",
									border: 0,
									fontSize: "21px",
									fontWeight: "bold",
									textAlign: "center",
								}}
							/>
							<ButtonGroup orientation='vertical'>
								<Button
									classes={{ root: "bg-1" }}
									variant='contained'
									onClick={() => quantity > 0 && setQuantity(quantity - 1)}
									sx={{ p: 0, height: 16, borderRadius: 0, borderBottom: 0.5 }}>
									-
								</Button>
								<Button
									classes={{ root: "bg-1" }}
									variant='contained'
									onClick={() => setQuantity(quantity + 1)}
									sx={{
										p: 0,
										height: 16,
										borderRadius: 0,
										borderTop: 0.5,
									}}>
									+
								</Button>
							</ButtonGroup>
						</Box>

						<Button
							onClick={submitOrder}
							classes={{ root: "bg-1" }}
							variant='contained'>
							<AddShoppingCartIcon />
						</Button>

						<Link
							to={`/products/${product?._id}`}
							style={{ textDecoration: "none" }}>
							<Button
								classes={{ root: "bg-1" }}
								sx={{ mx: 1, borderRadius: "0 11px 11px 0 " }}
								variant='contained'>
								Details
							</Button>
						</Link>
					</Box>
				</CardActions>
			</Card>
			<AlertSuccess
				successMsg={successMsg}
				openSuccessMsg={openSuccessMsg}
				setOpenSuccessMsg={setOpenSuccessMsg}></AlertSuccess>
		</>
	);
};

export default ProductCard;
