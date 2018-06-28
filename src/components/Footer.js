import React from "react";

const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<div id="footer-outer">
			<div className="footer">
				<div className="footer-content">
					<p>Gold-sim &copy;&nbsp;	<span>2014 &ndash;{year}</span></p>
				</div>
			</div>
		</div>  
	)
};

export default Footer;