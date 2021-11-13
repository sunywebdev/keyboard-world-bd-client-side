import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { CardMedia, Container, LinearProgress } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

export default function Blogs() {
	const [blogs, setBlogs] = React.useState([]);
	React.useEffect(() => {
		fetch(`https://murmuring-fjord-25327.herokuapp.com/blogs`)
			.then((res) => res.json())
			.then((data) => setBlogs(data));
	}, []);

	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Container sx={{ mt: 11, mx: "auto", textAlign: "center" }}>
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
							<Grid item xs={12} sm={6} md={4}>
								<Card sx={{ maxWidth: 345 }}>
									<CardHeader
										avatar={
											<img
												src={blog?.bloggerPhoto}
												alt=''
												width='35'
												height='35'
												style={{ borderRadius: "50%" }}
											/>
										}
										action={
											<IconButton aria-label='settings'>
												<MoreVertIcon />
											</IconButton>
										}
										title={blog?.blogTitle}
										subheader={blog?.blogTime}
									/>
									<CardMedia
										component='img'
										height='194'
										image={blog?.blogPhoto}
										alt='Paella dish'
									/>
									<CardContent>
										<Typography variant='body2' color='text.secondary'>
											{(blog?.blogDetails).slice(0, 150)}....
										</Typography>
									</CardContent>
									<CardActions disableSpacing>
										<IconButton aria-label='add to favorites'>
											<FavoriteIcon />
										</IconButton>
										<IconButton aria-label='share'>
											<ShareIcon />
										</IconButton>
										<ExpandMore
											expand={expanded}
											onClick={handleExpandClick}
											aria-expanded={expanded}
											aria-label='show more'>
											<ExpandMoreIcon />
										</ExpandMore>
									</CardActions>
									<Collapse in={expanded} timeout='auto' unmountOnExit>
										<CardContent>
											<Typography paragraph>{blog?.blogDetails}</Typography>
										</CardContent>
									</Collapse>
								</Card>
							</Grid>
						))}
					</Grid>
				</>
			) : (
				<LinearProgress />
			)}
		</Container>
	);
}
