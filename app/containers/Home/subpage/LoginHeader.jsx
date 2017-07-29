import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'; //redux自带的发起action方法
import { connect } from 'react-redux'; //连接redux
import * as userInfoActionsFormOtherFile from '../../../actions/userinfo'
import { hashHistory } from 'react-router';

import { STORE,USERINFO } from '../../../config/localStoreKey'
import localStore from '../../../util/localStore'

import { getUserData } from '../../../fetch/user/user';

import LoginHeaderComponent from '../../../components/LoginHeader';


class LoginHeader extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			hasLogined: false
		}
	}
	render(){
		return(
			<div>
				<LoginHeaderComponent userName={this.props.userinfo.name} 
									  showLoginForm={this.props.showLoginForm}
									  loginOutFn={this.loginOut.bind(this)}
									  goStoreFn={this.goStore.bind(this)} />
			</div>
		)
	}
	loginOut(){
		//将数据从redux中清空
		this.props.userInfoActions.update({});

		// 清空cookie
			localStore.setItem(USERINFO,'');
	}
	goStore(){
		if (this.props.userinfo.name) {
			hashHistory.push('/store');
		}else{
			alert('请先登录');
			// console.log('请先登录');
		}
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
)(LoginHeader);