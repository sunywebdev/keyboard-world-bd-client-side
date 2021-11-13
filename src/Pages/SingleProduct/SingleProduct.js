import React, { useEffect, useState } from "react";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
	Alert,
	Button,
	ButtonGroup,
	Card,
	CardActions,
	Container,
	Divider,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	Rating,
} from "@mui/material";
import { Box } from "@mui/system";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useParams } from "react-router";
import useAuth from "../../context/useAuth";
import { Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Filter7Icon from "@mui/icons-material/Filter7";
import axios from "axios";
import AlertSuccess from "../../SharedComponents/AlertSuccess/AlertSuccess";
import Header from "../../SharedComponents/Header/Header";
import Footer from "../../SharedComponents/Footer/Footer";

const SingleProduct = ({ prevQuantity }) => {
	console.log(prevQuantity);
	const { id } = useParams();
	const { user } = useAuth();
	const [openSuccessMsg, setOpenSuccessMsg] = React.useState(false);
	const [successMsg, setSuccessMsg] = useState("");
	const [product, setProduct] = useState([]);
	const [star, setStar] = useState(0);

	useEffect(() => {
		fetch(`https://murmuring-fjord-25327.herokuapp.com/products/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setProduct(data);
				setStar(product?.productReviewStar);
			});
	}, [id, product?.productReviewStar]);
	const [singleUser, setSingleUser] = useState([]);
	useEffect(() => {
		fetch(
			`https://murmuring-fjord-25327.herokuapp.com/singleUsers?email=${user?.email}`,
		)
			.then((res) => res.json())
			.then((data) => setSingleUser(data));
	}, [user?.email]);
	const [quantity, setQuantity] = useState(0);
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
			<Header></Header>
			<Container component={Paper} elevation={3} sx={{ pb: 3 }}>
				<Box sx={{ mx: "auto", mt: 3 }}>
					<Grid
						container
						spacing={2}
						sx={{ display: "flex", alignItems: "center" }}>
						<Grid item xs={12} md={5}>
							<CardMedia component='img' image={product?.productPhoto} />
						</Grid>
						<Grid item xs={12} md={4} sx={{ textAlign: "left" }}>
							<Typography
								gutterBottom
								variant='h6'
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
									<li>{product?.productInfo4}</li>
								</ul>
							</Typography>
							<Box sx={{ py: 1 }}>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
									}}>
									<Rating
										name='half-rating-read'
										value={star}
										precision={0.1}
										readOnly
									/>
									<Box sx={{ ml: 2, fontWeight: "bold" }}>
										<span style={{ fontWeight: "bold", marginLeft: 4 }}>
											{star}/5
										</span>
									</Box>
								</Box>

								<Typography
									gutterBottom
									variant='body1'
									component='div'
									classes={{ root: "color-1" }}
									sx={{ fontWeight: "bold" }}>
									Based on {product?.productReviewCount} review
								</Typography>
							</Box>

							<Typography variant='body2'>
								<ul style={{ paddingLeft: 21, margin: "5px 0 5px 0" }}>
									<li>Product Views: 297</li>
									<li>Stock: In Stock </li>
									<li>Brand: Meetion</li>
									<li>Model: MT-C505</li>
								</ul>
							</Typography>
							<Typography
								gutterBottom
								variant='h5'
								component='div'
								classes={{ root: "color-1" }}
								sx={{ fontWeight: "bold", mt: 1 }}>
								{product?.productPrice} ৳ x {quantity}p = &nbsp;
								{total} ৳
							</Typography>
							<CardActions sx={{ pb: 1.5 }}>
								<Box sx={{ display: "flex", alignItems: "center" }}>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											mr: 1,
											border: "2px solid black",
										}}>
										<input
											type='number'
											value={quantity}
											style={{
												maxWidth: 45,
												height: 27,
												borderRadius: 0,
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
												onClick={() =>
													quantity > 0 && setQuantity(quantity - 1)
												}
												sx={{ p: 0, height: 17, borderRadius: 0 }}>
												-
											</Button>
											<Button
												classes={{ root: "bg-1" }}
												variant='contained'
												onClick={() => setQuantity(quantity + 1)}
												sx={{
													p: 0,
													height: 17,
													borderRadius: 0,
													borderTop: 1,
												}}>
												+
											</Button>
										</ButtonGroup>
									</Box>
									<Button
										onClick={submitOrder}
										classes={{ root: "bg-1" }}
										sx={{ px: 4 }}
										variant='contained'>
										<AddShoppingCartIcon />
									</Button>
									<Button
										classes={{ root: "bg-1" }}
										sx={{ mx: 1 }}
										variant='contained'>
										<FavoriteBorderIcon />
									</Button>
								</Box>
							</CardActions>
						</Grid>
						<Grid item xs={12} md={3}>
							<Card>
								<List
									sx={{
										width: "100%",
										maxWidth: 360,
										bgcolor: "background.paper",
									}}
									component='nav'
									aria-labelledby='nested-list-subheader'
									subheader={
										<ListSubheader
											component='div'
											id='nested-list-subheader'
											sx={{ fontWeight: "bold", fontSize: 21 }}>
											User Info
										</ListSubheader>
									}>
									<ListItemButton>
										<ListItemIcon>
											<img
												src={singleUser?.photoURL}
												alt=''
												width='27'
												height='27'
												style={{ borderRadius: "50%" }}
											/>
										</ListItemIcon>
										<ListItemText primary={singleUser?.displayName} />
									</ListItemButton>
									<ListItemButton>
										<ListItemIcon>
											<EmailIcon />
										</ListItemIcon>
										<ListItemText primary={singleUser?.email} />
									</ListItemButton>
									<ListItemButton>
										<ListItemIcon>
											<PhoneIcon />
										</ListItemIcon>
										<ListItemText
											primary={singleUser?.contact || "N/A,Please Update"}
										/>
									</ListItemButton>
									<ListItemButton>
										<ListItemIcon>
											<LocationOnIcon />
										</ListItemIcon>
										<ListItemText
											primary={singleUser?.address || "N/A,Please Update"}
										/>
									</ListItemButton>
									<Link to={`/dashboard/updateProfile`}>
										<Button
											classes={{ root: "bg-1" }}
											sx={{ px: 4, py: 0.2, mb: 1 }}
											variant='contained'>
											Update Info
										</Button>
									</Link>
								</List>
								<Divider />
								<List
									sx={{
										width: "100%",
										maxWidth: 360,
										bgcolor: "background.paper",
									}}
									component='nav'
									aria-labelledby='nested-list-subheader'
									subheader={
										<ListSubheader
											component='div'
											id='nested-list-subheader'
											sx={{ fontWeight: "bold", fontSize: 21 }}>
											Return & Warranty
										</ListSubheader>
									}>
									<ListItemButton>
										<ListItemIcon>
											<Filter7Icon />
										</ListItemIcon>
										<ListItemText
											primary='7 Days Returns'
											secondary='Change of mind is not applicable'
										/>
									</ListItemButton>
									<ListItemButton>
										<ListItemIcon>
											<VerifiedUserIcon />
										</ListItemIcon>
										<ListItemText primary='One Year Official Warrenty' />
									</ListItemButton>
								</List>
							</Card>
						</Grid>
					</Grid>
					<Alert severity='error' sx={{ my: 2 }}>
						Product Image For Illustration Purposes Only. Actual Product May
						Vary In Size, Color And Layout. No Claim Will Be Accepted For Image
						Mismatch
					</Alert>
				</Box>
				<Typography
					gutterBottom
					variant='h5'
					component='div'
					classes={{ root: "color-1" }}
					sx={{ fontWeight: "bold", textAlign: "left", mt: 7, mb: 2 }}>
					{product?.productName}
				</Typography>
				<Typography
					gutterBottom
					variant='body2'
					component='div'
					classes={{ root: "color-1" }}
					style={{ textAlign: "justify" }}>
					{product?.productLongDetails}
				</Typography>
				<AlertSuccess
					successMsg={successMsg}
					openSuccessMsg={openSuccessMsg}
					setOpenSuccess={setOpenSuccessMsg}></AlertSuccess>
			</Container>
			<Footer></Footer>
		</>
	);
};

export default SingleProduct;
