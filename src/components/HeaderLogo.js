import React from "react";
import { Link } from "react-router-dom";

import Logo from '../images/logo.png';

const HeaderLogo = () => {
	console.log(document.location.pathname);
	const {pathname} = document.location;
	return (
		<div className="header-logo">
			{(pathname !== '/') &&  
				<Link to='/'>
					<img src={Logo}/>
				</Link>}
			
			{(pathname === '/') &&  <img src={Logo} alt="Gold-sim.com.ua" />}
		</div>
	)
};

export default HeaderLogo;