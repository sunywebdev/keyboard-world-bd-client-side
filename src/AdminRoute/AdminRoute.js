import React from "react";
import { Redirect, Route } from "react-router";
import useAuth from "../context/useAuth";
import { LinearProgress } from "@mui/material";

const AdminRoute = ({ children, ...rest }) => {
	let { user, admin, isLoading } = useAuth();
	if (isLoading) {
		return (
			<>
				<LinearProgress />
				<LinearProgress />
				<LinearProgress />
				<LinearProgress />
			</>
		);
	}
	return (
		<Route
			{...rest}
			render={({ location }) =>
				user?.email || admin ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/",
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
};
export default AdminRoute;
