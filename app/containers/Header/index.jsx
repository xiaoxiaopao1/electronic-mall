import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import LoginHeader from './subpage/LoginHeader';
import LoginAndSign from './subpage/LoginAndSign';

class Header extends React.Component {
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

export default Header;
