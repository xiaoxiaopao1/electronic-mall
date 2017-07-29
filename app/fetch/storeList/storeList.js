import { get } from '../get';
import { post } from '../post';

export function getStoreList(){
	const result = get('/api/login');
	return result;
}

export function postNewStore(name,store){
	const result = post('/api/store',{
		name: name,
		store: store
	})
	return result;
}