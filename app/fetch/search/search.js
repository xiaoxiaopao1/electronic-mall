import { get } from '../get';
import { post } from '../post';

export function getSearchData(){
	const result = get('/api/search');
	return result;
}

export function postSearchData(keyword){
	const result = post('/api/searchPost',{
		keyword: keyword
	});
	return result;
}