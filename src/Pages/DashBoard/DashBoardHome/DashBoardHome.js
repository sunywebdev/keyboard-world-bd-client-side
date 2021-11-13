import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import useAuth from "../../../context/useAuth";
import UpdateProfile from "../CustomerDashboard/UpdateProfile/UpdateProfile";
import AllUsers from "../AdminDashboard/AllUsers/AllUsers";
import PageRols from "../AdminDashboard/PageRols/PageRols";
import AddReviews from "../CustomerDashboard/AddReviews/AddReviews";
import AddProducts from "../AdminDashboard/AddProducts/AddProducts";
import Pay from "../CustomerDashboard/Pay/Pay";
import MyOrders from "../CustomerDashboard/MyOrders/MyOrders";
import AllOrders from "../AdminDashboard/AllOrders/AllOrders";
import AllProducts from "../AdminDashboard/AllProducts/AllProducts";
import EditProduct from "../AdminDashboard/EditProduct/EditProduct";
import AllReviews from "../AdminDashboard/AllReviews/AllReviews";
import AddBlogs from "../AdminDashboard/AddBlogs/AddBlogs";
import AllBlogs from "../AdminDashboard/AllBlogs/AllBlogs";
import AdminRoute from "../../../AdminRoute/AdminRoute";

const drawerWidth = 240;

function DashboardHome(props) {
	const { user, logOut, admin } = useAuth();
	let { path, url } = useRouteMatch();
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const [singleUser, setUser] = React.useState([]);
	React.useEffect(() => {
		fetch(
			`https://murmuring-fjord-25327.herokuapp.com/singleUsers?email=${user?.email}`,
		)
			.then((res) => res.json())
			.then((data) => setUser(data));
	}, [user?.email]);
	const Developer = singleUser?.userRole === "Developer";
	const drawer = (
		<div>
			<Button
				sx={{ my: 1.8, mx: "auto" }}
				variant='contained'
				classes={{ root: "bg-1" }}>
				<Link style={{ textDecoration: "none", color: "white" }} exact to='/'>
					Home Page
				</Link>
			</Button>

			<Divider />
			<List>
				{(!admin || Developer) && (
					<>
						<Link
							style={{ textDecoration: "none", color: "black" }}
							exact
							to={`${url}`}>
							<ListItem button>
								<ListItemIcon>
									<InboxIcon />
								</ListItemIcon>
								<ListItemText primary={"My Orders"} />
							</ListItem>
						</Link>

						<Link
							style={{ textDecoration: "none", color: "black" }}
							to={`${url}/pay`}>
							<ListItem button>
								<ListItemIcon>
									<InboxIcon />
								</ListItemIcon>
								<ListItemText primary={"Pay"} />
							</ListItem>
						</Link>
						<Link
							style={{ textDecoration: "none", color: "black" }}
							to={`${url}/updateProfile`}>
							<ListItem button>
								<ListItemIcon>
									<InboxIcon />
								</ListItemIcon>
								<ListItemText primary={"Update Profile"} />
							</ListItem>
						</Link>
						<Link
							style={{ textDecoration: "none", color: "black" }}
							to={`${url}/addreviews`}>
							<ListItem button>
								<ListItemIcon>
									<InboxIcon />
								</ListItemIcon>
								<ListItemText primary={"Add Review"} />
							</ListItem>
						</Link>
						<Divider />
					</>
				)}

				{(admin || Developer) && (
					<Box>
						<Link
							style={{ textDecoration: "none", color: "black" }}
							to={`${url}/allUsers`}>
							<ListItem button>
								<ListItemIcon>
									<InboxIcon />
								</ListItemIcon>

								<ListItemText primary={"All Users"} />
							</ListItem>
						</Link>
						<Link
							style={{ textDecoration: "none", color: "black" }}
							to={`${url}/allUsersReviews`}>
							<ListItem button>
								<ListItemIcon>
									<InboxIcon />
								</ListItemIcon>

								<ListItemText primary={"All Users Reviews"} />
							</ListItem>
						</Link>
						<Link
							style={{ textDecoration: "none", color: "black" }}
							to={`${url}/allorders`}>
							<ListItem button>
								<ListItemIcon>
									<InboxIcon />
								</ListItemIcon>

								<ListItemText primary={"All Orders"} />
							</ListItem>
						</Link>
						<Link
							style={{ textDecoration: "none", color: "black" }}
							to={`${url}/pageRoles`}>
							<ListItem button>
								<ListItemIcon>
									<InboxIcon />
								</ListItemIcon>

								<ListItemText primary={"Page Roles"} />
							</ListItem>
						</Link>
						<Link
							style={{ textDecoration: "none", color: "black" }}
							to={`${url}/allproducts`}>
							<ListItem button>
								<ListItemIcon>
									<InboxIcon />
								</ListItemIcon>

								<ListItemText primary={"All Products"} />
							</ListItem>
						</Link>
						<Link
							style={{ textDecoration: "none", color: "black" }}
							to={`${url}/addproduct`}>
							<ListItem button>
								<ListItemIcon>
									<InboxIcon />
								</ListItemIcon>

								<ListItemText primary={"Add Product"} />
							</ListItem>
						</Link>
						<Link
							style={{ textDecoration: "none", color: "black" }}
							to={`${url}/allblogs`}>
							<ListItem button>
								<ListItemIcon>
									<InboxIcon />
								</ListItemIcon>

								<ListItemText primary={"All Blogs"} />
							</ListItem>
						</Link>
						<Link
							style={{ textDecoration: "none", color: "black" }}
							to={`${url}/addblog`}>
							<ListItem button>
								<ListItemIcon>
									<InboxIcon />
								</ListItemIcon>

								<ListItemText primary={"Add Blog"} />
							</ListItem>
						</Link>
					</Box>
				)}
			</List>
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				classes={{ root: "bg-1" }}
				position='fixed'
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}>
				<Toolbar sx={{ justifyContent: "space-between" }}>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap component='div'>
						{singleUser?.userRole} Dashboard
					</Typography>
					{user?.email && (
						<Button color='inherit' onClick={logOut}>
							LogOut
						</Button>
					)}
				</Toolbar>
			</AppBar>
			<Box
				component='nav'
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label='mailbox folders'>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Drawer
					container={container}
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}>
					{drawer}
				</Drawer>
				<Drawer
					variant='permanent'
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
					open>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					p: 3,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
				}}>
				<Toolbar />
				<Switch>
					<Route exact path={path}>
						<MyOrders></MyOrders>
					</Route>
					<Route path={`${path}/pay`}>
						<Pay></Pay>
					</Route>
					<Route path={`${path}/updateProfile`}>
						<UpdateProfile></UpdateProfile>
					</Route>
					<Route path={`${path}/addReviews`}>
						<AddReviews></AddReviews>
					</Route>
					<AdminRoute path={`${path}/allUsers`}>
						<AllUsers></AllUsers>
					</AdminRoute>
					<AdminRoute path={`${path}/allUsersReviews`}>
						<AllReviews></AllReviews>
					</AdminRoute>
					<AdminRoute path={`${path}/allorders`}>
						<AllOrders></AllOrders>
					</AdminRoute>
					<AdminRoute path={`${path}/pageRoles`}>
						<PageRols></PageRols>
					</AdminRoute>
					<AdminRoute path={`${path}/allproducts`}>
						<AllProducts></AllProducts>
					</AdminRoute>
					<AdminRoute path={`${path}/addproduct`}>
						<AddProducts></AddProducts>
					</AdminRoute>
					<AdminRoute path={`${path}/editproduct/:id`}>
						<EditProduct></EditProduct>
					</AdminRoute>
					<AdminRoute path={`${path}/addblog`}>
						<AddBlogs></AddBlogs>
					</AdminRoute>
					<AdminRoute path={`${path}/allblogs`}>
						<AllBlogs></AllBlogs>
					</AdminRoute>
				</Switch>
			</Box>
		</Box>
	);
}

DashboardHome.propTypes = {
	window: PropTypes.func,
};

export default DashboardHome;
