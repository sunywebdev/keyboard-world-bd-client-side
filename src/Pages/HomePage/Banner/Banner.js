import React from "react";
import Grid from "@mui/material/Grid";
import { Button, Container, Divider, Typography } from "@mui/material";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const Banner = () => {
	const settings = {
		fade: true,
		infinite: true,
		autoplay: true,
		speed: 2000,
		autoplaySpeed: 2000,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
	};
	return (
		<div className='bg-1'>
			<Divider sx={{ border: "1px solid white" }} />
			<Container sx={{ mt: 7, py: { md: 11, xs: 4 } }}>
				<Grid
					spacing={3}
					container
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						color: "white",
					}}>
					<Grid item md={6} xs={12} sx={{ textAlign: "left" }}>
						<Typography
							component='div'
							variant='h4'
							sx={{ fontWeight: "bold", mb: 2 }}>
							KEYBOARD WORLD
						</Typography>
						<Typography variant='subtitle1' component='div'>
							On the hunt for a new computer keyboard? We've got quite the
							selection to choose from. Pick from keyboards with colour
							gradients; Cherry MX switches; bluetooth and wireless features;
							typewriter-style keys; LED backlights; ergonomic, solar-powered or
							customisable features; and bamboo keyboards to add to your
							desktop.
						</Typography>
						<Link style={{ textDecoration: "none" }} to='/allproducts'>
							<Button
								variant='raised'
								sx={{
									mt: 3,
									py: 1,
									fontWeight: "bold",
									color: "#6047ec",
								}}
								style={{ backgroundColor: "white" }}
								disableElevation
								disableRipple>
								Explore Keyboards
							</Button>
						</Link>
					</Grid>
					<Grid item md={6} xs={12} sx={{ pt: { md: 0, xs: 4 } }}>
						<Slider {...settings}>
							<img
								src='https://i.ibb.co/9qX9phS/meetion-mt-k9420-gaming-keyboard.png'
								alt=''
							/>
							<img
								src='https://i.ibb.co/WfJqGB9/meetion-mt-k9520-gaming-keyboard.png'
								alt=''
							/>
							<img
								src='https://i.ibb.co/VxB1QgJ/meetion-mt-mk20-gaming-keyboard-red.png'
								alt=''
							/>
						</Slider>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default Banner;
