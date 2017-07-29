import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'; //连接redux
import { hashHistory } from 'react-router';
import { bindActionCreators } from 'redux'

import { getProData } from '../../../fetch/product/product';
import { postNewStore } from '../../../fetch/storeList/storeList';

import ProductComponent from '../../../components/Product';

class Product extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			data: [],
			store: []
		}
	}
	render(){
		return(
			<div>
				{
					this.state.data.length
					? <ProductComponent data={this.state.data}
										storeFn={this.storeHandler.bind(this)} />
					: '加载中'
				}
			</div>
		)
	}
	componentDidMount(){
		this.resultHandler();
	}
	resultHandler(){
		const result = getProData();
		result.then(res => {
			return res.json();
		}).then(json => {
			const data = json;
			this.setState({
				data: data
			})
		})
	}
	storeHandler(alias){
		const userName = this.props.userinfo.name;
		if (userName) {
			const result = postNewStore(userName,alias);
			result.then(res => {
				return res.json();
			}).then(json => {
				if (json.errno == 0) {
					hashHistory.push('/store');
				}
			})

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
    }
}

// 返回出绑定redux的组件，上面两个函数作为参数
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Product);