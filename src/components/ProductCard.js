import React from "react";
import PARAMS from '../Constants';

const ProductCard = ({ product, onAddOrder, onDeleteOrder, orderList }) => {
	
	const { url } = (product.image) ? product.image : false;
	const price = +product.price;
	const isInOrder = orderList.list.filter(item => item.id === product.id);
	// console.log("product", product.id, isInOrder);


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
		    		{!product.reserve && 
		    			((!isInOrder.length && <button className="product-order" onClick={()=>onAddOrder(product)}>&nbsp;</button>) ||
		    			(isInOrder.length && <button className="product-order-del" onClick={()=>onDeleteOrder(product.id)}>&nbsp;</button>))
		    		}
			    </div>
			</div>
		</div>
	)
};

export default ProductCard;