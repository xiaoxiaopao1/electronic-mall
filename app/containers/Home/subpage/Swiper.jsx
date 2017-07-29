import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { getPosterData } from '../../../fetch/poster/poster';

import SwiperComponent from '../../../components/Swiper';

class Swiper extends React.Component {
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
					? <SwiperComponent data={this.state.data} />
					: ''
				}
			</div>
		)
	}
	componentDidMount(){
		this.resultHandler();
	}
	resultHandler(){
		const result = getPosterData();
		result.then(res => {
			return res.json();
		}).then(json => {
			const data = json;
			this.setState({
				data: data
			})
		})
	}
}

export default Swiper