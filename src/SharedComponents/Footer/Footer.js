import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
const Footer = () => {
	return (
		<div className='bg-1' style={{ padding: "0 3% 0 3%" }}>
			<Grid
				container
				spacing={2}
				sx={{ textAlign: "left", pt: 5, pb: 2, mt: 9, color: "white" }}>
				<Grid item md={4} sx={{ mx: "auto" }}>
					<Box>
						<Box sx={{ textAlign: "left" }}>
							<Typography sx={{ fontWeight: "bold", mt: 2 }} variant='h6'>
								NEWSLETTER
							</Typography>
							<Typography variant='h6'>
								Stay in the loop by signing up for our newsletter
							</Typography>
						</Box>
						<form>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									"& > :not(style)": { m: 1 },
									color: "white",
								}}>
								<input
									type='email'
									placeholder='Your Email'
									style={{
										border: "1px solid white",
										padding: "17px 5px",
										borderRadius: 5,
									}}
								/>
								<Button
									type='submit'
									variant='contained'
									sx={{
										mt: 3,
										py: 1,
										backgroundColor: "white",
										color: "#6047ec",
										fontWeight: "bold",
									}}
									style={{ backgroundColor: "white" }}
									disableElevation
									disableRipple>
									Subscribe
								</Button>
							</Box>
						</form>
					</Box>
				</Grid>
				<Grid item md={3} sx={{ mx: "auto" }}>
					<Typography
						sx={{ textAlign: "center", fontWeight: "bold", mt: 2, mb: 1 }}
						variant='h5'>
						PARTNARSHIP
					</Typography>
					<img
						style={{ width: "100%", backgroundColor: "white" }}
						src='https://www.techlandbd.com/image/cache/catalog/Bannerx/COMPRESSED%20PNG/techland-perstnership-min-300x165.png'
						alt=''
					/>
				</Grid>
				<Grid item md={5} sx={{ mx: "auto" }}>
					<Typography
						sx={{ textAlign: "center", fontWeight: "bold", mt: 2, mb: 1 }}
						variant='h5'>
						PAY WITH
					</Typography>
					<img
						style={{ width: "100%", backgroundColor: "white" }}
						src='https://www.techlandbd.com/image/cache/catalog/techland/logo/SSLCommerz-Pay-With-logo-All-470x80h.png'
						alt=''
					/>
				</Grid>
			</Grid>
			<p style={{ margin: 0, padding: "4px 0", color: "white" }}>
				All Right Reserved By<b> Keyboard World BD </b>
			</p>
		</div>
	);
};

export default Footer;
