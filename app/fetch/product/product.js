import { get } from '../get';

export function getProData(){
	const result = get('/api/product');
	return result;
}