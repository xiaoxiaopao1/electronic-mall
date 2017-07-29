import { get } from '../get';

export function getPosterData(){
	const result = get('/api/poster');
	return result;
}