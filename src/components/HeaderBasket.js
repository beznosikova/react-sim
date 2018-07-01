import React from "react";
import { Link } from "react-router-dom";

function wordend(number, titles){
    const cases = [2, 0, 1, 1, 1, 2];  
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
}


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
