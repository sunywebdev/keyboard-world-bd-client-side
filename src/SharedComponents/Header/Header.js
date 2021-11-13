import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import useAuth from "../../context/useAuth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ButtonGroup, Menu, MenuItem, Typography } from "@mui/material";

const Header = () => {
	const { user, logOut } = useAuth();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='fixed' classes={{ root: "bg-1" }}>
				<Toolbar sx={{ justifyContent: "space-between" }}>
					<Typography
						variant='h6'
						component='div'
						size='large'
						edge='start'
						color='inherit'
						aria-label='menu'>
						<Link
							style={{ textDecoration: "none", color: "white" }}
							sx={{ my: 1 }}
							exact
							to='/'>
							KEYBOARD WORLD BD
						</Link>
					</Typography>
					<Box>
						{user?.email && (
							<ButtonGroup variant='text'>
								<Link
									style={{ textDecoration: "none", color: "white" }}
									to='/dashboard'>
									<Button
										sx={{ display: { xs: "none", md: "block" } }}
										color='inherit'>
										Dashboard
									</Button>
								</Link>
								<Link
									style={{ textDecoration: "none", color: "white" }}
									to='/allproducts'>
									<Button
										sx={{ display: { xs: "none", md: "block" } }}
										color='inherit'>
										Explore More Products
									</Button>
								</Link>
								<Link
									style={{ textDecoration: "none", color: "white" }}
									to='/allblog'>
									<Button
										sx={{ display: { xs: "none", md: "block" } }}
										color='inherit'>
										All Blogs
									</Button>
								</Link>
							</ButtonGroup>
						)}
						<Menu
							id='basic-menu'
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								"aria-labelledby": "basic-button",
							}}>
							<Link
								style={{ textDecoration: "none", color: "black" }}
								sx={{ my: 1 }}
								exact
								to='/dashboard'>
								<MenuItem onClick={handleClose}>Dashboard</MenuItem>
							</Link>
							<Link
								style={{ textDecoration: "none", color: "black" }}
								sx={{ my: 1 }}
								exact
								to='/allblog'>
								<MenuItem onClick={handleClose}>All Blogs</MenuItem>
							</Link>
							<Link
								style={{ textDecoration: "none", color: "black" }}
								sx={{ my: 1 }}
								exact
								to='/allproducts'>
								<MenuItem onClick={handleClose}>Explore More Products</MenuItem>
							</Link>
							<MenuItem onClick={(handleClose, logOut)}>Logout</MenuItem>
						</Menu>
						{user?.email && (
							<Button
								sx={{ color: "white" }}
								aria-controls='basic-menu'
								aria-haspopup='true'
								aria-expanded={open ? "true" : undefined}
								onClick={handleClick}>
								{user?.photoURL === null ? (
									<AccountCircleIcon></AccountCircleIcon>
								) : (
									<img
										src={user?.photoURL}
										alt=''
										width='30'
										height='30'
										style={{ borderRadius: "50%" }}
									/>
								)}
							</Button>
						)}
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
