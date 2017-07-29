import * as actionTypes from '../constants/userinfo'
import { STORE } from '../config/localStoreKey'
import localStore from '../util/localStore'


const initialState = {};



export default function userinfo (state = initialState, action) {
    let storeArr = localStore.getItem(STORE);
    let store = []
    if (storeArr) {
        if (typeof storeArr == 'string') {
            store = storeArr.split(',');
            console.log(store);
        }
    }
	state.store = store;
    switch (action.type) {
        case actionTypes.USERINFO_UPDATE:
            return action.data;
        case actionTypes.USERINFO_ADD:
        	state.store.unshift(action.data);
        	return state;
        default:
            return state
    }
}