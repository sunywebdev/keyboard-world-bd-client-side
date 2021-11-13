import { CardMedia, Container, LinearProgress, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Reviews = () => {
	const [reviews, setReviews] = useState([]);
	useEffect(() => {
		fetch(`https://murmuring-fjord-25327.herokuapp.com/reviews`)
			.then((res) => res.json())
			.then((data) => setReviews(data));
	}, []);
	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		speed: 700,
		autoplaySpeed: 4000,
		cssEase: "linear",
		adaptiveHeight: true,
		swipeToSlide: true,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
					adaptiveHeight: true,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					adaptiveHeight: true,
				},
			},
		],
	};
	return (
		<Box sx={{ mt: 11, mx: "auto", textAlign: "center" }}>
			{reviews?.length > 0 ? (
				<>
					<Box>
						<Typography
							classes={{ root: "color-1" }}
							sx={{ fontWeight: "bold", mt: 2, mb: 1 }}
							variant='h4'>
							TESTIMONIAL
						</Typography>
						<Typography variant='h5' sx={{ mb: 5 }}>
							Customer Review About Our Service
						</Typography>
					</Box>
					<Container>
						<Slider {...settings}>
							{reviews?.map((review) => (
								<>
									<Card
										sx={{
											maxWidth: 345,
											mt: 5,
											mb: 1,
											pb: 2,
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											alignContent: "center",
											overflow: "visible",
										}}>
										<img src='' alt='' />
										<CardMedia
											component='img'
											style={{
												width: "70px",
												marginTop: -35,
												borderRadius: "50%",
												border: "7px solid white",
											}}
											image={review?.photoURL}
											alt=''
										/>
										<Typography
											classes={{ root: "color-1" }}
											gutterBottom
											variant='h6'
											component='div'>
											{review?.displayName}
										</Typography>
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
											}}>
											<Rating
												classes={{ root: "color-1" }}
												name='half-rating-read'
												defaultValue={review?.userReviewStar}
												precision={0.1}
												readOnly
											/>
										</Box>
										<Typography
											variant='body2'
											color='text.secondary'
											sx={{ mt: 1 }}>
											{review?.userReview}
										</Typography>
									</Card>
								</>
							))}
						</Slider>
					</Container>
				</>
			) : (
				<LinearProgress />
			)}
		</Box>
	);
};
export default Reviews;
