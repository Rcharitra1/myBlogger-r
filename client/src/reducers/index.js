import {combineReducers} from 'redux';
import authorization from './authorization';
import errors from './errors';
import bloggerReducer from './bloggerReducer';


export default combineReducers({
    auth: authorization,
    errors: errors,
    blogger:bloggerReducer
})