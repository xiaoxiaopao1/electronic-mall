import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import StoreItem from '../StoreItem';
import './style.less'

class StoreList extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		return(
			<div className='store-list'>
				<div className='store-nav'>
					<span>商品图</span>
					<span>商品名</span>
					<span>单价</span>
					<span>数量</span>
					<span>总价</span>
					<span>结算</span>
				</div>
				{
					this.props.data.map((item,index) => {
						return(
							<StoreItem key={index} data={item} />
						)
					})
				}
			</div>
			
		)
	}
	componentDidMount(){
	}
	
}

export default StoreList