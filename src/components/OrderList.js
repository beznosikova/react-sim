import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Box } from "smooth-ui";
import axios from 'axios';

import ProductCard from './ProductCard';
import OrderForm from './OrderForm';
import PARAMS from '../Constants';

class OrderList extends Component {

	constructor(props) {
		super(props);
		this.state = {
		  deliveryType: "ukr_post",
		  flashMessage: ""
		}
		this.onSubmitHandle = this.onSubmitHandle.bind(this);
	}    

	getDeliveryName = (deliveryValue) => {	
		if (!deliveryValue)	return false;

		let delivery = PARAMS.DELIVERY_TYPES.filter((item) => (item.value === deliveryValue));
		return delivery[0].label;
	}

	async onSubmitHandle(_values, _form){
		const list = this.props.orderList.list.map((item) => ({id:item.id, title:item.title}));
		const productsPrice = this.calcOrderPrice(this.props.orderList.list);
		const deliveryPrice = PARAMS.DELIVERY_PRICE[_values.delivery];

		const { onClearOrder } = this.props;
		const { push } = this.props.history;
		
		let values = {};
		values = {..._values, list, productsPrice, deliveryPrice }
		values.delivery = this.getDeliveryName(_values.delivery);

       try {
			const response = await axios.post(
				'http://sym.test/web/app_dev.php/api/order/', 
				// PARAMS.API_URL+'order/', 
				values, 
				{ headers: {'Content-Type': 'application/json',}}
		    );

			console.log(response);
			if (response.status === 200 && !('error' in response['data'])){
				onClearOrder();
				this.setState({flashMessage: "Заказ оформлен! В ближайшее время з Вами свяжеться менеджер."})
				
				setTimeout(() => push('/'), 10000);  		
			} 

			if ('error' in response['data']){
				this.setState({flashMessage: response['data']['error']})
			}
			_form.reset();

        } catch (err) {
           console.log(err);
        }
	}

	calcOrderPrice = (list) => {
		return list.reduce((sum, current) => (sum + Number(current.price)), 0);		
	}

	render() {

		const { orderList } = this.props;
		const { deliveryType, flashMessage } = this.state;
		const orderPrice = this.calcOrderPrice(orderList.list);
		const hasOrder = orderList.list.length > 0;
		const infoText = (flashMessage.length) ? flashMessage : (!hasOrder) ? "Корзина пуста" : "";

		return (
			<div className="content-text">
				<h1>Корзина</h1>

				{(infoText.length) ? (
					<Box margin="10px 0" justifyContent="Center">
						<p>{infoText}</p>
					</Box>
					) : ""}

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
