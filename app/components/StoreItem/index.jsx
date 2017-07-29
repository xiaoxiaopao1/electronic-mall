import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less';

class StoreItem extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			count: 1
		}
	}
	render(){
		const data = this.props.data;
		const newData = this.addRouter(data);
		const totalPrice = newData.price * this.state.count;
		return(
			<ul className='store-item'>
				<li>
					<img className='pic' src={newData.url} />
				</li>
				<li>
					<p>{newData.title}</p>
				</li>
				<li>
					<p>￥{newData.price}</p>
				</li>
				<li>
					<span className='reduce-btn' onClick={this.countReduce.bind(this)}>-</span>
					<input className='count-input'
						   value={this.state.count}
						   onChange={this.countHandler.bind(this)} />
					<span className='add-btn' onClick={this.countAdd.bind(this)}>+</span>
				</li>
				<li>
					<p>￥{totalPrice}</p>
				</li>
				<li>
					<button className='settlement-btn' onClick={this.accountsHandler.bind(this)}>结算</button>
				</li>
			</ul>
		)
	}
	componentDidMount(){
		
	}
	countHandler(e){
		this.setState({
			count: e.target.value
		})
	}
	countReduce(){
		if (this.state.count > 0) {
			this.setState({
				count: this.state.count - 1
			})
		}
	}
	countAdd(){
		this.setState({
			count: this.state.count + 1
		})
	}
	accountsHandler(){
		const data = this.props.data;
		alert(`共付款：${data.price * this.state.count}`)
		// console.log(`总价为：${data.price * this.state.count}`);
	}

	//添加图片路径属性
	addRouter(item){
		item.url = require('../../static/images/product/' + item.alias);
		return item;
	}
}

export default StoreItem