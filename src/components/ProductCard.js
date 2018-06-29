import React from "react";
import PARAMS from '../Constants';

const ProductCard = ({ product }) => {
	
	const { url } = (product.image) ? product.image : false;
	const price = +product.price;

	return (
		<div className="product-wrapper">
		  	{url && <img src={PARAMS.IMAGE_URL+url} alt={product.title} />}
		    <div className="title">{product.title}</div>
			<div className="product-content">
			    <div 
			    	className="desc"
					dangerouslySetInnerHTML={{__html: product.description}}
			    	>
			    </div>
			    <div className="price">
			    	<span>{price} грн</span>
		    		{product.reserve && <button className="product-send-mail">&nbsp;</button>}
		    		{!product.reserve && <button className="product-order">&nbsp;</button>}
			    </div>
			</div>
		</div>
	)
};

export default ProductCard;