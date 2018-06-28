import React from "react";
import { Link } from "react-router-dom";

import Logo from '../images/logo.png';

const HeaderLogo = () => {

	const { pathname } = document.location;

	return (
		<div className="header-logo">
			{(pathname !== '/') &&  
				<Link to='/'>
					<img src={Logo} alt="gold-sim"/>
				</Link>}
			
			{(pathname === '/') &&  <img src={Logo} alt="gold-sim"/>}
		</div>
	)
};

export default HeaderLogo;