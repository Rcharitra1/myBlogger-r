import axios from 'axios';
import {ERR_DISPATCH, GET_ALL_BLOGS, GET_BLOG, LOAD_BLOG_DISPATCH} from './types_SD';


export const getBlogs = () => dispatch =>{
    dispatch(setBlogLoading());
    axios.get('/api/blogs/all')
    .then(res => dispatch(
        {
            type:GET_ALL_BLOGS,
            payload:res.data
        }))
        .catch(err => dispatch(
            {
                type:ERR_DISPATCH,
                payload:err.response.data
            }))
}


export const setBlogLoading = () =>{
    return {
        type: LOAD_BLOG_DISPATCH
    }
}


export const viewBlog = (id, history) => dispatch=>
{
    dispatch(setBlogLoading());
    history.push('/blogs/blog')
    axios.get(`/api/blogs/blog/${id}`)
    .then(res=> 
        dispatch({
            type:GET_BLOG,
            payload:res.data
        })
        
    )
    .catch(err=>dispatch({
        type:ERR_DISPATCH,
        payload:err.response.data
    }))

}





