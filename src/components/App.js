import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';

import Footer from './Footer';
import HeaderLogo from './HeaderLogo';

import PARAMS from '../Constants';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	pages: [],
    	categories: []

    }
  }    

  getMenuList = (link) => {
  	console.log("Get menu function");
	const url = `${PARAMS.API_URL}${link}/`;

	axios.get(`${url}`)
      .then(({data, status}) => {
    	console.log("status", status);
    	console.log("data", data);

    	if (status === 200 && data){
    		const {categories, pages} = data
    		this.setState({categories, pages});
    	}
	})
  }

  componentWillMount() {
  	this.getMenuList('links');
  	// this.getMenuList('categories');
  }

  render() { 
  	
  	return (
  		<div>
  		<Router>
			<div id="main">
				<div id="header">
					<div className="header-main">
						<HeaderLogo />
						<div className="header-phone">
							<span >(098) 00-55-6-55, (063) 966-89-89</span>
						</div>
						<div className="header-basket ">
								<a href="#">
								<span><b>1</b> товар&nbsp;&nbsp;Сумма: <b>100 грн</b></span>
								</a>
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
								<input type="hidden" name="limitstart" value="0" />
								<input type="hidden" name="option" value="com_virtuemart" />
								<input type="hidden" name="view" value="category" />
							</form>
						</div>
					</div>
					<ul className="menu">
						<div>
							<li>
								<a href="/"  className="active">Главная</a>
							</li>
							<li>
								<a href="/dostavka-i-oplata/">Оплата и доставка</a>
							</li>
							<li>
								<a href="/kontakty/">Контакты</a>
							</li>
						</div>		
					</ul>
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
					<div className="content-text">
						<h1>Добро пожаловать на сайт красивых номеров телефонов!</h1>
						<div className="content-page">
							<p>Представляем Вам <strong>коллекцию красивых номеров операторов КИЕВСТАР, МТС, Life:)</strong> в Украине.</p>
							<p>В последнее время все большей популярностю пользуються красивые номера, золотые номера или вип номера мобильных телефонов.<br /><i><strong>Какой же он, золотой номер?</strong></i> Называют красивые номера по-разному, но каждый человек индивидуален, поэтому и золотой номер у каждого человека свой.&nbsp;</p>
							<p>Выбирая красивый номер телефона, каждый полагается на свои ассоциации и приследует свою причину выбора. Успешные люди всегда хотят быть первыми во всем, поэтому их золотой номер обязательно будет содержать в себе единицы или цифры, которые отображают "полноту", это девятки, восьмерки, семерки.</p>
							<p>Подбирая красивый номер, мы ищим в последовательности цифер гармонию, красоту и даже поэзию (риму). Такие вип номера телефонов легко запоминаются и станут "изюминкой" стиля человека или фирмы.</p>
							<p>Особенным подарком для Ваших близких будет золотой номер мобильного телефона.</p>
							<p>Анализируя спрос и популярность номеров, мы выделили красивые номера в определенные разделы.</p>
							<h4 >В подборке представлены такие номера мобильных телефонов:</h4>
							<p><i>Номера, в которых идут подряд 4 одинаковых цифры.<br /></i></p>
							<p><i>В разделе <a href="/butterfly/">Номера "Бабочки"</a> собраны номера, в которых цифры сочетаются как крылья у бабочки. Например, <a href="/096/096-182-3-182-detail">0XY-182-3-182</a>, <a href="/068/068-5-262-262-detail">0XY-5-262-262</a>.</i></p>
							<p><i>Раздел <a href="/nomera-s-tysyachami">Номера с тысячами</a>&nbsp;представляет номера Киевстар, которые заканчиваются на "тысячу" или содержат в себе "тысячу". Например, <a href="/097/097-090-8005-detail">0XY-090-8005</a>, <a href="/068/068-772-2002-detail">0XY-772-2002</a>.</i></p>
							<p><i>Номера, в которых идут подряд 3 одинаковых цифры. Например,&nbsp;<a href="/068/068-62-33-999-detail">0XY-62-33-999</a>, <a href="/068/068-83-777-22-detail">0XY-83-777-22</a>. Сейчас пользуються популярностью красивые номера, последние 4 цифры которых заканчиваются на идентичный автомобильный номер владельца.</i></p>
							<p><i>Также интересны золотые номера, в которых числа размещены подряд. Например,&nbsp;<a href="/096/096-490-91-92-detail">0XY-4-90-91-92</a>.</i></p>
							<p><i><a href="/mts/">Красивые номера оператора МТС</a>&nbsp;можете подобрать в соответствующем разделе.</i></p>
							<p>Если Вы ищете конкретный номер телефона, то Вам лучше воспользоваться <strong>поиском красивого номера по сайту</strong> (окошко находиться в верху сайта). Поиск на главной странице, ищет во всей базе. Если необходим поиск для конкретного раздела, переходите на страницу раздела и там задавайте параметры поиска.</p>
							<p><em>Все номера новые!</em>&nbsp;</p>
							<p>Всегда рады Вашим предложениям и пожеланиям!</p> 
						</div>
					</div>
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

