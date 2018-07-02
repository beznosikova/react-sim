import React, { Component } from "react";
import axios from 'axios';
// import InfiniteScroll from 'react-infinite-scroller';  
import Select from 'react-select';
import '../css/select.css';

import ProductCard from './ProductCard';
import PARAMS from '../Constants';


class OrderList extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  // productsList:[],
		}
		// this.getProducts = this.getProducts.bind(this);
		// this.handleChange = this.handleChange.bind(this);
	}    

	componentWillMount() {
		// this.getProducts(1);
	}

	componentWillReceiveProps() {
	    // this.setState({ productsList:[], hasMore:true, changedSort: true });
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
/*	handleChange = (sort) => {
		const sortValue = sort.value;
		this.setState({ sort:sortValue, productsList:[], hasMore:true, changedSort: true });
	}	*/

	render() {
		console.log("render Order List");
		const { onAddOrder, onDeleteOrder, orderList } = this.props;
		console.log("orderList", orderList);
		// const { productsList, hasMore, sort, changedSort} = this.state;
		// const loader = <div className="loader" key="loading-div"></div>;


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

			</div>
		);
	}
}

export default OrderList
