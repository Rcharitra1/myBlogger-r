import {combineReducers} from 'redux';
import authorization from './authorization';

export default combineReducers({
    auth: authorization
})