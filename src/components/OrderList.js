import React, { Component } from "react";
import ApiNovaPochta from 'yz-react-deliveri-newpochta';

import ProductCard from './ProductCard';
import OrderForm from './OrderForm';
// import { wordend } from '../utils'
// import PARAMS from '../Constants';

class OrderList extends Component {
	NP = new ApiNovaPochta();

	constructor(props) {
		super(props);
		this.state = {
		  deliveryType: "ukr_post",
		  // orderPrice: null
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

	/*getProducts(page){
		const { category, search } = this.props;
		const { productsList, sort } = this.state;
		const pageType = (search) ? "search" : "products";

		if (!category) return false;
		const url = `${PARAMS.API_URL}${pageType}/${category}/${page}/${sort}/`;
		
		axios.get(`${url}`)
		  .then(({data, status}) => {
			if (status === 200 && data){
				(data.length) && this.setState({productsList: [...productsList, ...data]});
				(!data.length) && this.setState({hasMore: false});
			}
		})		
	}
*/
	handleChange = (delivery) => {
		const deliveryType = delivery.value;
		this.setState({ deliveryType });
	}	

	onSubmitHandle = (_values, _form) => {
		// console.log("onSubmit", _values);
		_form.reset();
	}

	calcOrderPrice = (orderList) => {
		return orderList.list.reduce((sum, current) => (sum + Number(current.price)), 0);		
	}

	render() {
		console.log("render Order List");
		
		const { onAddOrder, onDeleteOrder, orderList } = this.props;
		const { deliveryType } = this.state;
		const orderPrice = this.calcOrderPrice(orderList);

		// console.log("orderPrice", orderPrice);

		return (
			<div className="content-text">
				<h1>Корзина</h1>
				<div className="content-products">
					{orderList.list.map(item => <ProductCard	
	  										key={`product_${item.id}`} 
	  										product={item} 
	  										onAddOrder={onAddOrder}
	  										onDeleteOrder={onDeleteOrder}
	  										orderList={orderList}
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

			</div>
		);
	}
}

export default OrderList
