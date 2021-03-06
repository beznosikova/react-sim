import React, { Component } from "react";
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';  
import Select from 'react-select';
import '../css/select.css';

import ProductCard from './ProductCard';
import PARAMS from '../Constants';


class ProductsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  productsList:[],
		  sort:"title-asc",
		  hasMore:true,
		  changedSort:false,
		  _prevCategory:null
		}
		this.getProducts = this.getProducts.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}    

	componentWillMount() {
		this.setState({'_category':this.props.category});
		this.getProducts(1);
	}

	componentWillReceiveProps() {
		const { category } = this.props;
		const { _prevCategory } = this.state;
		this.setState({_prevCategory: category})
	}	

	getProducts(page){
		const { category, search } = this.props;
		const { productsList, sort, _prevCategory} = this.state;
		const pageType = (search) ? "search" : "products";

		if (!category) return false;
		const url = `${PARAMS.API_URL}${pageType}/${category}/${page}/${sort}/`;
		
		axios.get(`${url}`)
		  .then(({data, status}) => {
			if (status === 200){

			  	if (data.length)
			  		this.setState({productsList: [...productsList, ...data]});
			  	else
					this.setState({hasMore: false, changedSort: false});
			}
		})		
	}

	handleChange = (sort) => {
		const sortValue = sort.value;
		this.setState({ sort:sortValue, productsList:[], hasMore:true, changedSort: true });
	}	

	render() {
		const { h1, search, category, onAddOrder, onDeleteOrder, orderList } = this.props;
		const { productsList, hasMore, sort, changedSort, _prevCategory} = this.state;
		const loader = <div className="loader" key="loading-div"></div>;

		if (category !== _prevCategory && search){
			this.setState({ 
				productsList:[], 
				hasMore:true, 
				changedSort: true, 
				_prevCategory:category
			})
		}

		let page = 1;

		let items = null;
		if (productsList.length){
		  items = productsList.map(item => <ProductCard	
		  										key={`product_${item.id}`} 
		  										product={item} 
		  										onAddOrder={onAddOrder}
		  										onDeleteOrder={onDeleteOrder}
		  										orderList={orderList}
		  										/>)
		} else if(changedSort) {
			this.getProducts(1);
		}

		return (
			<div className="content-text">
				<h1>{h1}</h1>

				<div className="content-sort">
					<Select
					    name="sort"
					    value={sort}
					    onChange={this.handleChange}
					    options={PARAMS.SORT}
					    clearable={false}
					    className="select-sort"
					  />
				</div>
				<div className="clear"></div>
				{search && category && <p>Строка поиска {category}</p>}
				{search && !category && <p>Введите строку поиска</p>}
				
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
					) : (<div></div>)
					}
			</div>
		);
	}
}

export default ProductsList
