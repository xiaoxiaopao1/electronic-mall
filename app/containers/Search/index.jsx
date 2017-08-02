import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { hashHistory } from 'react-router';
import { connect } from 'react-redux'; //连接redux
import { getProData } from '../../fetch/product/product';
import { postNewStore } from '../../fetch/storeList/storeList';
import SearchHeader from '../../components/SearchHeader';
import Product from '../../components/Product';

class Search extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			data: []
		}
	}
	render(){
		console.log(this.state.data);
		return(
			<div>
				<SearchHeader />
				{
					this.state.data
					? this.state.data.length
					  ? <Product data={this.state.data}
					  			 storeFn={this.storeHandler.bind(this)} />
		  			  : '加载中...'
					: <p>没有找到相关产品</p>
				}
			</div>
		)
	}
	componentDidMount(){
		this.resultHandler();
	}
	componentDidUpdate(prevProps,prevState){
		const keyword = this.props.params.keyword;
		if ( keyword === prevProps.params.keyword) {
			return;
		}

		this.resultHandler();
	}
	resultHandler(){
		const keyword = this.props.params.keyword;
		const result = getProData();
		result.then(res => {
			return res.json();
		}).then(json => {
			const totalData = json;
			const data = totalData.filter(item => {
				// 把keyword拆分成空格分割的数组
				const keyArr = keyword.split(' ');
				return keyArr.some(iitem => {
					const re = new RegExp(iitem,'i');
					return re.test(item.title);
				})


				
			})
			if (!data.length) {
				this.setState({
					data: null
				})
			}else{
				this.setState({
					data
				})
			}
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
)(Search);