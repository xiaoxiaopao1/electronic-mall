import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less';

class Login extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			user: '',
			userErr: false,
			password: '',
			passwordErr: false
		}
	}
	render(){
		const userMarkStyle = this.state.userErr ? {visibility: 'visible'} : {},
			  userInputStyle = this.state.userErr ? {border: '1px solid #ff0000'} : {},
			  passwordMarkStyle = this.state.passwordErr ? {visibility: 'visible'} : {},
			  passwordInputStyle = this.state.passwordErr ? {border: '1px solid #ff0000'} : {};
		return(
			<div className='login'>
				<h2>用户名</h2>
				<input value={this.state.user}
					   style={userInputStyle}
					   onChange={this.userChange.bind(this)}
					   placeholder='请输入用户名、邮箱或者手机号'
					   onBlur={this.userBlur.bind(this)}
					   onFocus={this.userFocus.bind(this)}/>
				<span className='mark'
					  style={userMarkStyle}>用户名错误，请重新输入</span>
				<h2>密码</h2>
				<input value={this.state.password}
					   style={passwordInputStyle}
					   onChange={this.passwordChange.bind(this)}
					   placeholder='请输入密码'
					   onFocus={this.passwordFocus.bind(this)} />
				<span className='mark'
					  style={passwordMarkStyle}>密码错误，请重新输入</span>
				<button className='login-btn' 
						style={passwordMarkStyle}
						onClick={this.loginHandler.bind(this)}>登录</button>
			</div>
		)
	}
	componentDidMount(){
		// console.log(this.props.data);
	}
	userChange(e){
		this.setState({
			user: e.target.value
		})
	}
	userBlur(){
		const data = this.props.data;
		const userOk = data.some(item => {
			return (
				this.state.user == item.name ||
				this.state.user == item.email ||
				this.state.user == item.tel
			)
		})
		if (!userOk) {
			this.setState({
				userErr: true
			})
		}
	}
	userFocus(){
		this.setState({
			userErr: false
		})
	}
	passwordChange(e){
		this.setState({
			password: e.target.value
		})
	}
	passwordFocus(){
		this.setState({
			passwordErr: false
		})
	}
	loginHandler(){
		this.resultCheck();
	}
	resultCheck(){
		const data = this.props.data,
			  loginFn = this.props.loginFn,
			  hideLoginForm = this.props.hideLoginForm;
		const getUserInfo = data.map((item,index) => {
			if (this.state.user == item.name ||
				this.state.user == item.email ||
				this.state.user == item.tel) {
				return item;
			}
		});
		for(let i = 0; i < getUserInfo.length; i++){
			if (getUserInfo[i]) {
				if (getUserInfo[i].password == this.state.password) {
					loginFn(getUserInfo[i]);
					hideLoginForm();
				}else{
					this.setState({
						passwordErr: true
					})
				}
			}
		}
	}
}

export default Login