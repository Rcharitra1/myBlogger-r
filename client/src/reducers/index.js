import {combineReducers} from 'redux';
import authorization from './authorization';
import errors from './errors';


export default combineReducers({
    auth: authorization,
    errors: errors
})