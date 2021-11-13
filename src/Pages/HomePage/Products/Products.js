import React, { useEffect, useState } from "react";
import { Button, Container, LinearProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import ProductCard from "../../../SharedComponents/ProductCard/ProductCard";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const Products = () => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		fetch(`https://murmuring-fjord-25327.herokuapp.com/products8`)
			.then((res) => res.json())
			.then((data) => setProducts(data));
	}, [products]);

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
							<Grid
								item
								xs={12}
								sm={6}
								md={3}
								key={product?._id}
								sx={{ mx: "auto" }}>
								<ProductCard product={product}></ProductCard>
							</Grid>
						))}
					</Grid>
					<Link to='/allproducts' style={{ textDecoration: "none" }}>
						<Button
							classes={{ root: "bg-1" }}
							variant='contained'
							sx={{ mt: 3 }}>
							Explore More Products
						</Button>
					</Link>
				</>
			) : (
				<LinearProgress />
			)}
		</Container>
	);
};

export default Products;
