import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux';

import LoginHeader from './subpage/LoginHeader';
import LoginAndSign from './subpage/LoginAndSign';
import Swiper from './subpage/Swiper';
import SearchHeader from '../../components/SearchHeader'
import Product from './subpage/Product';

class Home extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			showLoginForm: false
		}
	}
	render(){
		return(
			<div>
				<LoginHeader showLoginForm={this.showLoginForm.bind(this)} />
				{
					this.state.showLoginForm
					? <LoginAndSign hideLoginForm={this.hideLoginForm.bind(this)} />
					: ''
				}
				<Swiper />
				<SearchHeader />
				<Product />
			</div>
		)
	}
	showLoginForm(){
		this.setState({
			showLoginForm: true
		})
	}
	hideLoginForm(){
		this.setState({
			showLoginForm: false
		})
	}
}

export default Home;