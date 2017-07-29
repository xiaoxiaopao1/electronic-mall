import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import LocalStore from '../util/localStore'; //缓存(里面有getItem和setItem方法)
import { STORE,USERINFO } from '../config/localStoreKey';//里面有userinfo常量，缓存关键字
import { bindActionCreators } from 'redux'; //redux自带的发起action方法
import { connect } from 'react-redux'; //连接redux
import * as userInfoActionsFormOtherFile from '../actions/userinfo'
// 绑定用户信息行为的一系列action
class App extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		// 先通过缓存设置项目初始化，设置完成后initDone为true
		this.state = {
			initDone: false
		}
	}
	render(){
		return(
			<div>
				{
					this.state.initDone
					? this.props.children
					: <div>加载中</div>
				}
			</div>
		)
	}
	componentDidMount(){
		//从缓存localStoreage中获取用户信息
		const userName = LocalStore.getItem(USERINFO),
			  store = LocalStore.getItem(STORE);
		if (userName) {
			//如果用户信息存在，将信息存储到redux中
			// 此处的userInfoActions在下面的mapDispathToProps中
			this.props.userInfoActions.update({
				name: userName
			});

			if (store) {
				this.props.userInfoActions.update({
					name: userName,
					store: store
				})
			}
		}

		// App初始化完成
		this.setState({
			initDone: true
		})
	}
}

//--------------redux react 绑定----------------------

// 此处绑定的是把当前状态绑定到redux中
// 从redux中获取信息
function mapStateToProps(state){
	return {}
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
)(App);
