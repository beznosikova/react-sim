import React from "react";
import { Link } from "react-router-dom";

function recurtionDisplay(item){
	const { pathname } = document.location;

	const classString = (pathname === `/${item.alias}/`) ? "active" : "";
	const link = (item.alias) 
		? <Link to={`/${item.alias}/`} className={classString}>{item.title}</Link>
		: <span>{item.title}</span>;

	if (item.subCategories){
		const { subCategories } = item;
		return (
			<li key={`categories_${item.id}`}>{link}
				<ul className="menu-sub">
					{subCategories.map((subItem) => recurtionDisplay(subItem))}
				</ul>
			</li>
			)
	} else {

		return (<li key={`categories_${item.id}`}>{link}</li>)
	}

}

const LeftMenu = ({items}) => {

	return (
		<ul className="menu">
            {items.map(item => recurtionDisplay(item))} 
		</ul>
	 )
};

export default LeftMenu;