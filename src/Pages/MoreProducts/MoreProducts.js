import React, { useEffect, useState } from "react";
import { Container, LinearProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import ProductCard from "../../SharedComponents/ProductCard/ProductCard";
import Header from "../../SharedComponents/Header/Header";
import Footer from "../../SharedComponents/Footer/Footer";
import { Box } from "@mui/system";

const MoreProducts = () => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		fetch(`https://murmuring-fjord-25327.herokuapp.com/products`)
			.then((res) => res.json())
			.then((data) => setProducts(data));
	}, [products]);

	return (
		<>
			<Header></Header>
			{products?.length > 0 ? (
				<Container sx={{ py: 8 }}>
					<Box>
						<Typography
							classes={{ root: "color-1" }}
							sx={{ fontWeight: "bold", mt: 2, mb: 1 }}
							variant='h4'>
							PRODUCTS
						</Typography>
						<Typography variant='h5' sx={{ mb: 5 }}>
							Choose best keyboard by your need
						</Typography>
					</Box>
					<Grid container spacing={2} sx={{ mx: "auto" }}>
						{products?.map((product) => (
							<Grid item xs={12} sm={6} md={3}>
								<ProductCard product={product}></ProductCard>
							</Grid>
						))}
					</Grid>
				</Container>
			) : (
				<LinearProgress />
			)}
			<Footer></Footer>
		</>
	);
};

export default MoreProducts;
