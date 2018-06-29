import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios';

import Footer from './Footer';
import HeaderLogo from './HeaderLogo';
import HeaderPhone from './HeaderPhone';
import TopMenu from './TopMenu';
import LeftMenuWrapper from './LeftMenuWrapper';
import Page from './Page';
import ProductsList from './ProductsList';

import PARAMS from '../Constants';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pages: [],
			categories: []
		}
	}    

	getMenuList = () => {
		const url = `${PARAMS.API_URL}links/`;

		axios.get(`${url}`)
		  .then(({data, status}) => {
			if (status === 200 && data){
				const {categories, pages} = data
				this.setState({categories, pages});
			}
		})
	}

	pagesRoutes = (page) => {
		let pathString = (page.mainPage) ? '/' : `/${page.alias}/`;
		let {h1, description} = page;
		return (
			<Route  
				key={`route_${page.id}`}
				exact
				path={pathString} 
				render={()=><Page h1={h1} description={description}/>}
			/>
		)
	}

	recurtionCategoriesRoutes = (item) => {

		const route = (item.alias) ? (							
			<Route  
				key={`route_cat_${item.id}`}
				path={`/${item.alias}/`} 
				render={()=><ProductsList category={item.alias} h1={item.h1}/>}
			/>) : false;

		if (item.subCategories){
			const { subCategories } = item;
		 	return (
		 		<Switch key={`switch_cat_${item.id}`}>
		 			{route}
			 		{subCategories.map((subItem) => this.recurtionCategoriesRoutes(subItem))}
		 		</Switch>
		 	);
		} 

		return route;
	}  

	componentWillMount() {
		this.getMenuList();
	}

	render() { 
	  	const {pages, categories} = this.state;
	  	
	  	return (
	  		<div>
	  		<Router>
				<div id="main">
					<div id="header">
						<div className="header-main">
							<HeaderLogo />
							<HeaderPhone />

							<div className="header-basket empty">
									{/*<a href="#">*/}
									<span><b>1</b> товар&nbsp;&nbsp;Сумма: <b>100 грн</b></span>
									{/*</a>*/}
							</div>	

							<div className="header-search">
								<form action="" method="get">
									<input 
										name="keyword" 
										alt="Поиск" 
										className="header-search-box" 
										type="text" 
										size="20" 
										placeholder="Поиск..."
										autoComplete="off"
									/>
									<button className="header-search-button">Найти</button>
								</form>
							</div>
						</div>

						<TopMenu items={pages}/>
						<div className="clear"></div>
					</div>
					<div id="content">
						<LeftMenuWrapper items={categories}/>
						{pages.map((page) => this.pagesRoutes(page))}	
						{categories.map((category) => this.recurtionCategoriesRoutes(category))}								
						<div className="clear"></div>
					</div>
				</div>
	  		</Router>

			<Footer />		
	  		</div>
	  	);
	}
}

export default App;
