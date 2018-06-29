import React, { Component } from "react";
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';  

import ProductCard from './ProductCard';
import PARAMS from '../Constants';


class ProductsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  productsList:[],
		  hasMore:true
		}
		this.getProducts = this.getProducts.bind(this);
	}    

	componentWillMount() {
		this.getProducts(1);
	}	

	getProducts(page){
		const { category } = this.props;
		const { productsList } = this.state;
		const url = `${PARAMS.API_URL}products/${category}/${page}/`;

		axios.get(`${url}`)
		  .then(({data, status}) => {
			if (status === 200 && data){
				console.log("data", data);
				if (data.length)
					this.setState({productsList: [...productsList, ...data]});
				else 
					this.setState({hasMore: false});
			}
		})		
	}

	render() {

		const { h1 } = this.props;
		const { productsList, hasMore } = this.state;
		const loader = <div className="loader"></div>;

		let page = 1;

		let items = null;
		if (productsList.length){
		  items = productsList.map(item => <ProductCard	key={`product_${item.id}`} product={item} />)
		}

		return (
			<div className="content-text">
				<h1>{h1}</h1>

				<div className="content-sort">
					<span>сортировка</span>
					<select name="sort" id="sort-product">
						<option value="price_asc">от дешевых</option>
						<option value="price_desc">от дорогих</option>
						<option value="name_asc">по названию</option>
					</select>
				</div>

				
					{
					productsList.length ? (
					  <InfiniteScroll
					      pageStart={page}
					      loadMore={this.getProducts.bind(this)}
					      hasMore={hasMore}
					      loader={loader}
					      key={0}           
					      >   
						<div className="content-products">
					        {items}
						</div>	
					  </InfiniteScroll>
					) : (<div className="loader"></div>)
					}	
								
{/*					{productsList.map((product) => (
							<ProductCard  
								key={`product_${product.id}`}
								product={product}
							/>						
						))}		*/}											
				
			</div>
		);
	}
}

export default ProductsList
