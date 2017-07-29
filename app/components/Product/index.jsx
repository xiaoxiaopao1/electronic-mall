import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less';

class Product extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		const data = this.props.data;
		const newData = data.map((item,index) => {
			// 此处不能单纯的拼接路径，需要进行对应路径下的图片引入
			item.url = require('../../static/images/product/' + item.alias);
			return item;
		})
		return(
			<div className='product'>
				<ul className='product-container'>
					{
						newData.map((item,index) => {
							return(
								<li key={index} className='product-item'>
									<a>
										<img src={item.url} alt={item.title} />
									</a>
									<p className='title'>{item.title}</p>
									<p className='price'>价格：¥{item.price}</p>
									<button className='store'
											onClick={this.storeHandler.bind(this,item.alias)}>加入购物车</button>
								</li>
							)
						})
					}
				</ul>
			</div>
		)
	}
	componentDidMount(){
		// const data = this.props.data;
		// console.log(data);
	}
	storeHandler(alias){
		const storeFn = this.props.storeFn;
		storeFn(alias);
	}
}

export default Product