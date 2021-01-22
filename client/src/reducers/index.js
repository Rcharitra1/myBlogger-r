import {combineReducers} from 'redux';
import authorization from './authorization';
import errors from './errors';
import bloggerReducer from './bloggerReducer';
import blogReducer from './blogReducer';


export default combineReducers({
    auth: authorization,
    errors: errors,
    blogger:bloggerReducer,
    blog:blogReducer
})