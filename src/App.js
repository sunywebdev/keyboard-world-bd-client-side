import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import "./App.css";
import AuthProvider from "./context/AuthProvider";
import HomeMain from "./Pages/HomePage/HomeMain/HomeMain";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import PasswordReset from "./Pages/PasswordReset/PasswordReset";
import SingleProduct from "./Pages/SingleProduct/SingleProduct";
import DashBoardHome from "./Pages/DashBoard/DashBoardHome/DashBoardHome";
import MoreProducts from "./Pages/MoreProducts/MoreProducts";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import NotFound from "./Pages/NotFound/NotFound";
import AllBlogs from "./Pages/AllBlogs/AllBlogs";

function App() {
	return (
		<div className='App'>
			<AuthProvider>
				<BrowserRouter>
					<Switch>
						<Route exact path='/'>
							<HomeMain></HomeMain>
						</Route>
						<PrivateRoute path='/dashboard'>
							<DashBoardHome></DashBoardHome>
						</PrivateRoute>
						<PrivateRoute path='/products/:id'>
							<SingleProduct></SingleProduct>
						</PrivateRoute>
						<PrivateRoute path='/allproducts'>
							<MoreProducts></MoreProducts>
						</PrivateRoute>
						<PrivateRoute path='/allblog'>
							<AllBlogs></AllBlogs>
						</PrivateRoute>
						<Route path='/login'>
							<Login></Login>
						</Route>
						<Route path='/signup'>
							<SignUp></SignUp>
						</Route>
						<Route path='/resetpassword'>
							<PasswordReset></PasswordReset>
						</Route>
						<Route path='*'>
							<NotFound></NotFound>
						</Route>
					</Switch>
				</BrowserRouter>
			</AuthProvider>
		</div>
	);
}

export default App;
