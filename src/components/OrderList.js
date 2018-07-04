import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Box } from "smooth-ui";
import axios from 'axios';

// import ApiNovaPochta from 'yz-react-deliveri-newpochta';

import ProductCard from './ProductCard';
import OrderForm from './OrderForm';
import PARAMS from '../Constants';

class OrderList extends Component {
	// NP = new ApiNovaPochta();

	constructor(props) {
		super(props);
		this.state = {
		  deliveryType: "ukr_post",
		  flashMessage: false
		}
		this.onSubmitHandle = this.onSubmitHandle.bind(this);
		// this.handleChange = this.handleChange.bind(this);
	}    

	componentWillMount() {

		// this.NP.getAreas((data) => { 
		// 	console.log(data);
		// }, PARAMS.API_KEY_NP);		
	}

	componentWillReceiveProps() {

	}	

	getDeliveryName = (deliveryValue) => {	
		if (!deliveryValue)	return false;

		let delivery = PARAMS.DELIVERY_TYPES.filter((item) => (item.value === deliveryValue));
		return delivery[0].label;
	}

	async onSubmitHandle(_values, _form){
		const { list } = this.props.orderList;
		const productsPrice = this.calcOrderPrice(list);
		const deliveryPrice = PARAMS.DELIVERY_PRICE[_values.delivery];

		const { onClearOrder } = this.props;
		const { push } = this.props.history;
		
		let values = {};
		values = {..._values, list, productsPrice, deliveryPrice }
		values.delivery = this.getDeliveryName(_values.delivery);
		console.log("onSubmit", values);
		console.log("list", JSON.stringify(list));
		

       try {
			const response = await axios.post(
				'http://sym.test/web/app_dev.php/api/order/', 
				// PARAMS.API_URL+'order/', 
				values, 
				{ headers: {'Content-Type': 'application/json',}}
		    );

			console.log(response);
			if (response.status === 200){
					// _form.reset();
					// onClearOrder();
					// this.setState({flashMessage: true})
					
					// setTimeout(() => push('/'), 10000);  		
			}           
        } catch (err) {
           console.log(err);
        }
	}

	calcOrderPrice = (list) => {
		return list.reduce((sum, current) => (sum + Number(current.price)), 0);		
	}

	render() {
		console.log("render Order List");
		
		const { orderList } = this.props;
		const { deliveryType, flashMessage } = this.state;
		const orderPrice = this.calcOrderPrice(orderList.list);
		const hasOrder = orderList.list.length > 0;
		const infoText = (flashMessage) ? "Заказ оформлен! В ближайшее время з Вами свяжеться менеджер." : "Корзина пуста";
		// console.log("orderPrice", orderPrice);

		return (
			<div className="content-text">
				<h1>Корзина</h1>

				{!hasOrder && (
					<Box margin="10px 0" justifyContent="Center">
						<p>{infoText}</p>
					</Box>
					)}

				{hasOrder &&
					(<div>
						<div className="content-products">
							{orderList.list.map(item => <ProductCard	
			  										key={`product_${item.id}`} 
			  										product={item} 
			  										{...this.props}
			  										/>)}
						</div>	
						<h2>Оформить заказ</h2>
						<div>
							<OrderForm 
								onSubmit={this.onSubmitHandle}
								initialValues={{delivery:deliveryType}}
								orderPrice={orderPrice}
							/>
						</div>
					</div>)
				}

			</div>
		);
	}
}

export default withRouter(OrderList)
