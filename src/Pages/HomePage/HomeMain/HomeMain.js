import React from "react";
import Footer from "../../../SharedComponents/Footer/Footer";
import Header from "../../../SharedComponents/Header/Header";
import Banner from "../Banner/Banner";
import Blogs from "../Blogs/Bolgs";
import Products from "../Products/Products";
import Reviews from "../Reviews/Reviews";

const HomeMain = () => {
	return (
		<div>
			<Header></Header>
			<Banner></Banner>
			<Products></Products>
			<Reviews></Reviews>
			<Blogs></Blogs>
			<Footer></Footer>
		</div>
	);
};

export default HomeMain;
