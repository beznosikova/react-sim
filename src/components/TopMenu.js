import React from "react";
import { Link } from "react-router-dom";


const TopMenu = ({items}) => {

	const { pathname } = document.location;

	return (
		<ul className="menu">		
			<div>
				{items.map((item) => {
					let classString = (pathname === `/${item.alias}/`) ? "active" : "";
					let pathString = (item.mainPage) ? '/' : `/${item.alias}/`
					return (
						<li key={`pages_${item.id}`}>
							<Link 
								to={pathString} 
								className={classString}
							>
								{item.title}
							</Link>
						</li>					
					)}
				)}
			</div>		
		</ul>
	)
};

export default TopMenu;