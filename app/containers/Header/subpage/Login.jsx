import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'; //redux自带的发起action方法
import { connect } from 'react-redux'; //连接redux
import { USERINFO } from '../../../config/localStoreKey'
import localStore from '../../../util/localStore'
import * as userInfoActionsFormOtherFile from '../../../actions/userinfo'

import { getUserData } from '../../../fetch/user/user';
import LoginComponent from '../../../components/Login';

class Login extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			data: []
		}
	}
	render(){
		return(
			<div>
				{
					this.state.data.length
					? <LoginComponent data={this.state.data} 
									  loginFn={this.loginHandler.bind(this)}
									  hideLoginForm={this.props.hideLoginForm}/>
					: '加载中...'
				}
			</div>
			
		)
	}
	componentDidMount(){
		const result = getUserData();
		result.then(res => {
			return res.json();
		}).then(json => {
			const data = json;
			this.setState({
				data: data
			})
		})
	}
	loginHandler(userinfo){
		if (userinfo.name == null) {
			return;
		}
		// 将数据更新到redux中
		this.props.userInfoActions.update({
			name: userinfo.name
		})

		// 修改cookie
		localStore.setItem(USERINFO,userinfo.name);
	}

}

//--------------redux react 绑定----------------------

// 此处绑定的是把当前状态绑定到redux中
// 从redux中获取信息
function mapStateToProps(state){
	return {
		userinfo: state.userinfo
	}
}
// 从redux获取操控方法
function mapDispatchToProps(dispatch){
	return {
		userInfoActions: bindActionCreators(userInfoActionsFormOtherFile,dispatch)
	}
}

// 返回出绑定redux的组件，上面两个函数作为参数
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);