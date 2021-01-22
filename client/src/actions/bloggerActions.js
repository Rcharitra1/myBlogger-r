import axios from 'axios';
import {CLEAR_BLOGGER_DISPATCH, ERR_DISPATCH, GET_BLOGGER_DISPATCH, LOAD_BLOGGER_DISPATCH, SET_USER_DISPATCH} from './types_SD';


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

export const createBlogger =(bloggerData, history)=>dispatch =>{
    axios.post('/api/blogger', bloggerData)
    .then(res => history.push('/blogger'))
    .catch(err=>
        dispatch({
            type:ERR_DISPATCH,
            payload:err.response.data
        }))
}


export const deleteAccount=()=>dispatch=>{
    if(window.confirm('You are going to delete your account. This is irreverible. Are you sure?')){
        axios.delete('api/blogger')
        .then(res => 
            dispatch(
                {
                    type:SET_USER_DISPATCH,
                    payload:{}
                })
                ).catch(err =>
                    dispatch({
                        type:ERR_DISPATCH,
                        payload:err.response.data
                    }))
    }
}


export const addExperience = (expData, history)=> dispatch => {
    axios.post('/api/blogger/experience', expData)
    .then(res => history.push('/blogger'))
    .catch(err=> 
        dispatch({
            type: ERR_DISPATCH,
            payload:err.response.data
        }));
}

export const addEducation = (eduData, history)=> dispatch => {
    axios.post('/api/blogger/education', eduData)
    .then(res => history.push('/blogger'))
    .catch(err=> 
        dispatch({
            type: ERR_DISPATCH,
            payload:err.response.data
        }));
}

export const deleteExp = (id) =>
dispatch=>{
    axios.delete(`/api/blogger/experience/${id}`)
    .then(res=> 
        dispatch
        ({
                type:GET_BLOGGER_DISPATCH,
                payload:res.data
            })
        ).catch(err=> 
        dispatch({
                type:ERR_DISPATCH,
                payload:err.response.data
        }))
}

export const deleteEdu = (id) =>
dispatch =>
{
    axios.delete(`/api/blogger/education/${id}`)
    .then(res=> 
        dispatch({
            type:GET_BLOGGER_DISPATCH,
            payload:res.data
        }))
        .catch(err=>
            dispatch(
                {
                    type:ERR_DISPATCH,
                    payload:err.response.data
                }))
}