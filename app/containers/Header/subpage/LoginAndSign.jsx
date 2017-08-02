import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Login from './Login';
import Sign from './Sign';

import './style.less';

class LoginAndSign extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			isLogin: true
		}
	}
	render(){
		const loginStyle = this.state.isLogin ? {color: '#3333ff'} : {},
			  signStyle = this.state.isLogin ? {} : {color: '#3333ff'};
		return(
			<div className='login-and-sign'>
				<div className='close'>
					<span onClick={this.hideHandler.bind(this)}>关闭</span>
				</div>
				<div className='nav'>
					<span style={loginStyle} onClick={this.loginHandler.bind(this)}>登录</span>
					<span style={signStyle} onClick={this.signHandler.bind(this)}>注册</span>
				</div>

				{
					this.state.isLogin
					? <Login hideLoginForm={this.props.hideLoginForm} />
					: <Sign />
				}
			</div>
		)
	}
	loginHandler(){
		this.setState({
			isLogin: true
		})
	}
	signHandler(){
		this.setState({
			isLogin: false
		})
	}
	hideHandler(){
		const hideLoginForm = this.props.hideLoginForm;
		hideLoginForm();
	}
}

export default LoginAndSign