import React from "react";
import { Link } from "react-router-dom";
import { wordend } from '../utils'


const HeaderBasket = ({orderList}) => {
	const { list } = orderList;
	const emptyClass = list.length ? "empty" : "";
	const count = list.length;
	const sum = list.reduce(function(sum, current) {
	  return sum + Number(current.price);
	}, 0);	

	return (
		<div className={`header-basket ${emptyClass}`}>
			{(emptyClass !== "") && (
				<Link to="/order/">
					<span>
						<b>{count}</b>&nbsp;
						{wordend(count, ["товар", "товара", "товаров"])}&nbsp;&nbsp;Сумма: <b>{sum} грн</b></span>
				</Link>				
				)}
			{(emptyClass === "") && (<span>Корзина пуста</span>)}
		</div>	
	)
};

export default HeaderBasket;
