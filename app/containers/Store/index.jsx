import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { getProData } from '../../fetch/product/product';
import { getStoreList } from '../../fetch/storeList/storeList';
import StoreList from '../../components/StoreList';

import './style.less';

class Store extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			data: null
		}
	}
	render(){
		return (
			<div className='store-page'>
				<button className='go-home-btn' onClick={this.goHome.bind(this)}>返回首页</button>
				<div>
				{
					this.state.data
					? this.state.data.length
					  ? <StoreList data={this.state.data} />
					  : <p className='no-store'>还没有购物</p>
					: ''
				}
				</div>
			</div>
		)
	}
	componentDidMount(){
		this.resultHandler();
	}
	goHome(){
		hashHistory.push('/');
	}
	resultHandler(){
		let product,store;
		let data = [];
		this.resultProduct().then(data => {
			// 获取所有产品
			product = data;
			return getStoreList();
		}).then(res => {
			return res.json();
		}).then(json => {
			// 获取所有购物信息
			const data = json;
			data.map((item,index) => {
				if (item.name == this.props.userinfo.name) {
					store = item.storeList;
				}
			})
		}).then(() => {
			if (!store) {
				this.setState({
					data: []
				})
			}else{
				const data = store.map((item,index) => {
					return this.getFullInfo(item,product);
				});
				this.setState({
					data: data
				})	
			}
			
		})
	}
	resultProduct(){
		const result = getProData();
		return result.then(res => {
			return res.json();
		}).then(json => {
			const product = json;
			return product;
		})
	}
	getFullInfo(ele,arr){
		const newArr = arr.filter((item) => {
			return ele == item.alias;
		});
		return newArr[0];
	}

}

// -------------------redux react 绑定--------------------
function mapStateToProps(state){
    return{
        userinfo: state.userinfo
    }
}

function mapDispathToProps(dispatch){
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispathToProps
)(Store)