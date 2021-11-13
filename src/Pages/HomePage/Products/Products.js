import React, { useEffect, useState } from "react";
import { Container, LinearProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import ProductCard from "../../../SharedComponents/ProductCard/ProductCard";
import { Box } from "@mui/system";

const Products = () => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		fetch(`http://localhost:5000/products`)
			.then((res) => res.json())
			.then((data) => setProducts(data));
	}, []);

	return (
		<Container sx={{ mt: 11, mx: "auto" }}>
			{products?.length > 0 ? (
				<>
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
				</>
			) : (
				<LinearProgress />
			)}
		</Container>
	);
};

export default Products;
