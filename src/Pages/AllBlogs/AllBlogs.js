import * as React from "react";
import { Container, LinearProgress, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import SingleBlog from "../HomePage/Blogs/SingleBlog";
import Footer from "../../SharedComponents/Footer/Footer";
import Header from "../../SharedComponents/Header/Header";

export default function Blogs() {
	const [blogs, setBlogs] = React.useState([]);
	React.useEffect(() => {
		fetch(`http://murmuring-fjord-25327.herokuapp.com/blogs`)
			.then((res) => res.json())
			.then((data) => setBlogs(data));
	}, []);

	return (
		<>
			<Header></Header>
			<Container sx={{ py: 8, mx: "auto" }}>
				{blogs?.length > 0 ? (
					<>
						<Box>
							<Typography
								classes={{ root: "color-1" }}
								sx={{ fontWeight: "bold", mt: 2, mb: 1 }}
								variant='h4'>
								BLOGS
							</Typography>
							<Typography variant='h5' sx={{ mb: 5 }}>
								Small blogs about latest products
							</Typography>
						</Box>
						<Grid container spacing={2} sx={{ mx: "auto", width: "100%" }}>
							{blogs?.map((blog) => (
								<Grid item xs={12} sm={6} md={4} key={blog?._id}>
									<SingleBlog blog={blog}></SingleBlog>
								</Grid>
							))}
						</Grid>
					</>
				) : (
					<LinearProgress />
				)}
			</Container>
			<Footer></Footer>
		</>
	);
}
