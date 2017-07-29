import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { getUserData,postNewUser } from '../../../fetch/user/user';

import SignComponent from '../../../components/Sign';

class Sign extends React.Component {
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
					? <SignComponent  data={this.state.data}
									  postNewUserFn={this.postNewUserFn.bind(this)} />
					: '加载中...'
				}
			</div>				
		)
	}
	componentDidMount(){
		const result = getUserData();
		result.then(res => {
			return res.json();
		}).then(json => {
			const data = json;
			this.setState({
				data: data
			})
		})
	}
	postNewUserFn(name,password,email,tel){
		const result = postNewUser(name,password,email,tel);
		result.then(res => {
			return res.json();
		}).then(json => {
			if (json.errno == 0) {
				console.log('注册成功');
			}
		})
	}
}

export default Sign