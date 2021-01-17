import axios from 'axios';
import {CLEAR_BLOGGER_DISPATCH, ERR_DISPATCH, GET_BLOGGER_DISPATCH, LOAD_BLOGGER_DISPATCH} from './types_SD';


export const getCurrentBlogger =()=> dispatch =>{
    dispatch(setBloggerLoading());

    axios.get('/api/blogger')
    .then(res=>
        dispatch({
            type:GET_BLOGGER_DISPATCH,
            payload:res.data
        }))
        .catch(err=>dispatch({
            type:GET_BLOGGER_DISPATCH,
            payload:{}
        }))
}

export const setBloggerLoading = () =>{
    return {
        type: LOAD_BLOGGER_DISPATCH
    }
}

export const clearBlogger = () =>{
    return {
        type:CLEAR_BLOGGER_DISPATCH
    }
}