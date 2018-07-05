import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {

	return (
		<div className="content-text">
			<h1>Странца не найдена</h1>
			<div className="content-page">
				<Link to="/">На главную страницу</Link>
			</div>
		</div>
	)
};

export default NotFound;