import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import AlertSuccess from "../../../../SharedComponents/AlertSuccess/AlertSuccess";

const EditProduct = () => {
	const { id } = useParams();
	const [openSuccessMsg, setOpenSuccessMsg] = React.useState(false);
	const [successMsg, setSuccessMsg] = useState("");

	const { register, handleSubmit, reset } = useForm({
		defaultValues: {
			productId: "",
			productPhoto: "",
			productName: "",
			productPrice: "",
			productReviewCount: "",
			productReviewStar: "",
			productInfo1: "",
			productInfo2: "",
			productInfo3: "",
			productInfo4: "",
			productLongDetails: "",
		},
	});

	const onSubmit = (data) => {
		axios
			.put(`https://murmuring-fjord-25327.herokuapp.com/products/${id}`, data)
			.then(function (response) {
				setOpenSuccessMsg(true);
				setSuccessMsg("Your Product Details Edited Successfully !");
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	useEffect(() => {
		axios
			.get(`https://murmuring-fjord-25327.herokuapp.com/products/${id}`)
			.then((res) => {
				reset(res.data);
			});
	}, [id, reset]);
	return (
		<Container>
			<Grid justifyContent='space-between' container spacing={0}>
				<Grid item md={6} sx={{ textAlign: "left", mx: "auto", my: { xs: 5 } }}>
					<Typography
						classes={{ root: "color-1" }}
						sx={{ textAlign: "center", pb: 2, fontWeight: "bold" }}
						variant='h5'>
						Edit Product
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
								label='Product ID'
								InputLabelProps={{
									shrink: true,
								}}
								{...register("productId", { required: true })}
							/>
							<TextField
								type='text'
								label='Product Photo'
								InputLabelProps={{
									shrink: true,
								}}
								{...register("productPhoto", { required: true })}
							/>
							<TextField
								type='text'
								label='Product Name'
								InputLabelProps={{
									shrink: true,
								}}
								{...register("productName", { required: true })}
							/>
							<TextField
								type='number'
								label='Product Price'
								InputLabelProps={{
									shrink: true,
								}}
								{...register("productPrice", { required: true })}
							/>
							<TextField
								type='number'
								label='Product Review Count'
								InputLabelProps={{
									shrink: true,
								}}
								{...register("productReviewCount", { required: true })}
							/>
							<TextField
								type='number'
								label='Product Review Star'
								InputLabelProps={{
									shrink: true,
								}}
								{...register("productReviewStar", { required: true })}
							/>
							<TextField
								type='text'
								label='Product Info 1'
								InputLabelProps={{
									shrink: true,
								}}
								{...register("productInfo1", { required: true })}
							/>
							<TextField
								type='text'
								label='Product Info 2'
								InputLabelProps={{
									shrink: true,
								}}
								{...register("productInfo2", { required: true })}
							/>
							<TextField
								type='text'
								label='Product Info 3'
								InputLabelProps={{
									shrink: true,
								}}
								{...register("productInfo3", { required: true })}
							/>
							<TextField
								type='text'
								label='Product Info 4'
								InputLabelProps={{
									shrink: true,
								}}
								{...register("productInfo4", { required: true })}
							/>
							<TextField
								id='outlined-multiline-static'
								label='Product Long Details'
								multiline
								rows={5}
								InputLabelProps={{
									shrink: true,
								}}
								{...register("productLongDetails", { required: true })}
							/>

							<Button
								type='submit'
								classes={{ root: "bg-1" }}
								variant='contained'
								sx={{ mt: 3 }}>
								Update
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
export default EditProduct;
