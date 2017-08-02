import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less';

class Sign extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			name: '',
			password: '',
			email: '',
			tel: '',
			nameErr: false,
			emailErr: false,
			telErr: false
		}
	}
	render(){
		const nameInputStyle = this.state.nameErr ? {border: '1px solid #ff0000'} : {},
			  nameMarkStyle = this.state.nameErr ? {visibility: 'visible'} : {},
			  emailInputStyle = this.state.emailErr ? {border: '1px solid #ff0000'} : {},
			  emailMarkStyle = this.state.emailErr ? {visibility: 'visible'} : {},
			  telInputStyle = this.state.telErr ? {border: '1px solid #ff0000'} : {},
			  telMarkStyle = this.state.telErr ? {visibility: 'visible'} : {};
		return(
			<div className='sign'>
				<h2>用户名</h2>
				<input value={this.state.name}
					   style={nameInputStyle}
					   onChange={this.nameChange.bind(this)}
					   onBlur={this.nameBlur.bind(this)}
					   onFocus={this.nameFocus.bind(this)}
					   placeholder='请输入用户名' />
				<span className='mark' style={nameMarkStyle}>用户名已存在，请重新输入</span>
				<h2>电子邮箱</h2>
				<input value={this.state.email}
					   style={emailInputStyle}
					   onChange={this.emailChange.bind(this)}
					   onBlur={this.emailBlur.bind(this)}
					   onFocus={this.emailFocus.bind(this)}
					   placeholder='请输入电子邮箱' />
				<span className='mark' style={emailMarkStyle}>邮箱已被其他账号绑定，请重新输入</span>
				<h2>手机号</h2>
				<input value={this.state.tel}
					   style={telInputStyle}
					   onChange={this.telChange.bind(this)}
					   onBlur={this.telBlur.bind(this)}
					   onFocus={this.telFocus.bind(this)}
					   placeholder='请输入手机号' />
				<span className='mark' style={telMarkStyle}>手机号已被其他账号绑定，请重新输入</span>
				<h2>密码</h2>
				<input value={this.state.password}
					   onChange={this.passwordChange.bind(this)}
					   placeholder='请输入密码'/>
				<button className='sign-btn' onClick={this.signHandler.bind(this)}>注册</button>
			</div>
		)
	}
	componentDidMount(){
		console.log(this.props.data);
	}
	nameChange(e){
		this.setState({
			name: e.target.value
		})
	}
	nameBlur(){
		const hasErr = this.resultCheck('name');
		if (hasErr) {
			console.log('用户名已存在，请重新输入');
			this.setState({
				nameErr : true
			})
		}
	}
	nameFocus(){
		this.setState({
			nameErr: false
		})
	}
	emailChange(e){
		this.setState({
			email: e.target.value
		})
	}
	emailBlur(){
		const hasErr = this.resultCheck('email');
		if (hasErr) {
			console.log('邮箱已被其他账号绑定，请重新输入');
			this.setState({
				emailErr : true
			})
		}
	}
	emailFocus(){
		this.setState({
			emailErr: false
		})
	}
	telChange(e){
		this.setState({
			tel: e.target.value
		})
	}
	telBlur(){
		const hasErr = this.resultCheck('tel');
		if (hasErr) {
			console.log('手机号已被其他账号绑定，请重新输入');
			this.setState({
				telErr : true
			})
		}
	}
	telFocus(){
		this.setState({
			telErr: false
		})
	}
	resultCheck(keyword){
		const data = this.props.data;
		const hasErr = data.some(item => {
			return item[keyword] == this.state[keyword];
		});
		return hasErr;
	}
	passwordChange(e){
		this.setState({
			password: e.target.value
		})
	}
	signHandler(){
		if (!this.state.nameErr && 
			!this.state.emailErr &&
			!this.state.telErr &&
			this.state.password) {
			
			const postNewUserFn = this.props.postNewUserFn;
			postNewUserFn(this.state.name,
						  this.state.password,
						  this.state.email,
						  this.state.tel);
		}
	}
}

export default Sign