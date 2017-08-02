import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux';

import Swiper from './subpage/Swiper';
import SearchHeader from '../../components/SearchHeader'
import Product from './subpage/Product';

class Home extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		return(
			<div>
				<Swiper />
				<SearchHeader />
				<Product />
			</div>
		)
	}
}

export default Home;