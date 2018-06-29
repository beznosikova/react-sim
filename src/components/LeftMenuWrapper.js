import React, { Component } from "react";
import LeftMenu from './LeftMenu';

class LeftMenuWrapper extends Component {

	state = {
    	active: false
    }	

    changeMenuView(){
    	const { active } = this.state; 
		this.setState({ active: !active })
    }

	render() { 
		const { items } = this.props;
		const { active } = this.state;

		const buttonClass = (active) ? "change" : "";
		const menuClass = (active) ? "active" : "";

		return (
			<div>
				<div className={`container ${buttonClass}`} onClick={this.changeMenuView.bind(this)}>
					<div className="bar1"></div>
					<div className="bar2"></div>
					<div className="bar3"></div>
				</div>
				<div className="clear"></div>
				<div className={`content-menu ${menuClass}`} id="mobile-menu">
					<LeftMenu items={items}/>
				</div>
			</div>
		)
	}
}

export default LeftMenuWrapper;
