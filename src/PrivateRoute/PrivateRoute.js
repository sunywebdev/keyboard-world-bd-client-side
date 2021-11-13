import React from "react";
import { Redirect, Route } from "react-router";
import useAuth from "../context/useAuth";
import { LinearProgress } from "@mui/material";

const PrivateRoute = ({ children, ...rest }) => {
	let { user, isLoading } = useAuth();
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
				user?.email ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/Login",
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
};
export default PrivateRoute;
