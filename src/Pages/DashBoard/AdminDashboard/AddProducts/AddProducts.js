import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import AlertSuccess from "../../../../SharedComponents/AlertSuccess/AlertSuccess";

const AddProducts = () => {
	const [openSuccessMsg, setOpenSuccessMsg] = React.useState(false);
	const [successMsg, setSuccessMsg] = React.useState("");
	const { register, handleSubmit } = useForm();
	const onSubmit = (data) => {
		axios
			.post("https://murmuring-fjord-25327.herokuapp.com/products", data)
			.then(function (response) {
				setOpenSuccessMsg(true);
				setSuccessMsg("Successfully added new product !");
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
						Add New Product
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
								{...register("productId", { required: true })}
							/>
							<TextField
								type='text'
								label='Product Photo'
								{...register("productPhoto", { required: true })}
							/>
							<TextField
								type='text'
								label='Product Name'
								{...register("productName", { required: true })}
							/>
							<TextField
								type='number'
								label='Product Price'
								{...register("productPrice", { required: true })}
							/>
							<TextField
								type='number'
								label='Product Review Count'
								{...register("productReviewCount", { required: true })}
							/>
							<TextField
								type='number'
								label='Product Review Star'
								{...register("productReviewStar", { required: true })}
							/>
							<TextField
								type='text'
								label='Product Info 1'
								{...register("productInfo1", { required: true })}
							/>
							<TextField
								type='text'
								label='Product Info 2'
								{...register("productInfo2", { required: true })}
							/>
							<TextField
								type='text'
								label='Product Info 3'
								{...register("productInfo3", { required: true })}
							/>
							<TextField
								type='text'
								label='Product Info 4'
								{...register("productInfo4", { required: true })}
							/>
							<TextField
								id='outlined-multiline-static'
								label='Product Long Details'
								multiline
								rows={5}
								{...register("productLongDetails", { required: true })}
							/>

							<Button
								type='submit'
								classes={{ root: "bg-1" }}
								variant='contained'
								sx={{ mt: 3 }}>
								Add Product
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
export default AddProducts;
