import * as React from "react";
import { Container, LinearProgress, Grid, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import SingleBlog from "./SingleBlog";
import { Link } from "react-router-dom";

export default function Blogs() {
	const [blogs, setBlogs] = React.useState([]);
	React.useEffect(() => {
		fetch(`https://murmuring-fjord-25327.herokuapp.com/blogs3`)
			.then((res) => res.json())
			.then((data) => setBlogs(data));
	}, []);

	return (
		<Container sx={{ mt: 11, mx: "auto", textAlign: "center", pl: 0 }}>
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
					<Grid container spacing={2} sx={{ mx: "auto" }}>
						{blogs?.map((blog) => (
							<Grid item xs={12} sm={6} md={4} key={blog?._id}>
								<SingleBlog blog={blog}></SingleBlog>
							</Grid>
						))}
					</Grid>
					<Link to='/allblog' style={{ textDecoration: "none" }}>
						<Button
							classes={{ root: "bg-1" }}
							variant='contained'
							sx={{ mt: 3 }}>
							View more Blogs
						</Button>
					</Link>
				</>
			) : (
				<LinearProgress />
			)}
		</Container>
	);
}
