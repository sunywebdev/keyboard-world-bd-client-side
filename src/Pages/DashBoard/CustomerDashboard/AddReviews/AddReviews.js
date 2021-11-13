import {
	Button,
	Container,
	Grid,
	Rating,
	TextField,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../context/useAuth";
import AlertSuccess from "../../../../SharedComponents/AlertSuccess/AlertSuccess";

const AddReviews = () => {
	const { user } = useAuth();
	const [openSuccessMsg, setOpenSuccessMsg] = React.useState(false);
	const [successMsg, setSuccessMsg] = React.useState("");
	const [rating, setRating] = React.useState(2);
	const { register, handleSubmit, reset } = useForm({
		defaultValues: {
			displayName: "",
			photoURL: "",
		},
	});
	useEffect(() => {
		axios
			.get(
				`https://murmuring-fjord-25327.herokuapp.com/singleUsers?email=${user?.email}`,
			)
			.then((res) => {
				reset(res.data);
			});
	}, [reset, user?.email]);
	const onSubmit = ({ photoURL, displayName, userReview }) => {
		const userReviewStar = rating;
		const data = { photoURL, displayName, userReview, userReviewStar };
		axios
			.post(`https://murmuring-fjord-25327.herokuapp.com/reviews`, data)
			.then(function (response) {
				setOpenSuccessMsg(true);
				setSuccessMsg("Your Review Added Successfully !");
				reset();
			})
			.catch(function (error) {
				console.log(error);
			});
	};
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
						Add Review
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
								label='User Photo URL'
								InputLabelProps={{
									shrink: true,
								}}
								{...register("photoURL", { required: true })}
							/>
							<TextField
								type='text'
								label='User Name'
								InputLabelProps={{
									shrink: true,
								}}
								{...register("displayName", { required: true })}
							/>

							<TextField
								type='text'
								label='User Review'
								multiline
								rows={4}
								{...register("userReview", { required: true })}
							/>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
								}}>
								<Rating
									name='half-rating'
									size='large'
									classes={{ root: "color-1" }}
									precision={0.1}
									value={rating}
									onChange={(event, newValue) => {
										setRating(newValue);
									}}
								/>
								<Box sx={{ ml: 2, fontWeight: "bold" }}>{rating}</Box>
							</Box>
							<Button
								type='submit'
								classes={{ root: "bg-1" }}
								variant='contained'
								sx={{ mt: 3 }}>
								Add Review
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
export default AddReviews;
