import React from "react";

const Page = ({h1, description}) => {

	return (
		<div className="content-text">
			<h1>{h1}</h1>
			<div 
				className="content-page"
				dangerouslySetInnerHTML={{__html: description}}
				>
				
			</div>
		</div>
	)
};

export default Page;