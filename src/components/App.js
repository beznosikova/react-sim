import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';

import Footer from './Footer';
import HeaderLogo from './HeaderLogo';
import HeaderPhone from './HeaderPhone';
import TopMenu from './TopMenu';
import Page from './Page';

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
  	console.log("Get menu function");
	const url = `${PARAMS.API_URL}links/`;

	axios.get(`${url}`)
      .then(({data, status}) => {
    	if (status === 200 && data){
    		const {categories, pages} = data
    		this.setState({categories, pages});
    	}
	})
  }

  componentWillMount() {
  	this.getMenuList();
  }

  render() { 
  	const {pages} = this.state;
  	
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
					<div className="container" onClick="this.classList.toggle('change'); document.getElementById('mobile-menu').classList.toggle('active');">
						<div className="bar1"></div>
						<div className="bar2"></div>
						<div className="bar3"></div>
					</div>
					<div className="clear"></div>
					<div className="content-menu" id="mobile-menu">

						<ul className="menu">
							<li>
								<a href="/ks/" >Номера Киевстар</a>
							</li>
							<div className="menu-sub">
								<li>
									<a href="/068/" >068</a>
								</li>
								<li>
									<a href="/096/" >096</a>
								</li>
								<li>
									<a href="/097/" >097</a>
								</li>
								<li>
									<a href="/098/" >098</a>
								</li>
								<li>
									<a href="/butterfly/" >Номера &quot;Бабочки&quot;</a>
								</li>
								<li>
									<a href="/nomera-s-tysyachami/" >Номера с тысячами</a>
								</li>
								<li>
									<a href="/rasprodazha/" >Распродажа номеров</a>
								</li>
							</div>
							<li>
								<a href="/mts/" >Номера Vodafone</a>
							</li>
							<li>
								<a href="/pary-nomerov/" >Пары номеров</a>
							</li>
						</ul>
					</div>

					{pages.map((page) => {
						let pathString = (page.mainPage) ? '/' : `/${page.alias}/`;
						let {h1, description} = page;
						return (
							<Route  
								key={`route_${page.id}`}
								exact
								path={pathString} 
								render={()=><Page h1={h1} description={description}/>}
							/>
						)}
					)}					

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

