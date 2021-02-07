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
    history && history.push('/blogs/blog');
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


export const deleteComment = (blogid, commentid) => dispatch=>{
    axios.delete(`/api/blogs/comment/${blogid}/${commentid}`)
    .then(res=> 
        dispatch({
            type:GET_BLOG,
            payload:res.data
        }))
        .catch(err => dispatch({
            type:ERR_DISPATCH,
            payload:err.response.data
        }))
}


export const addComment = (comment,blogid) => dispatch =>
{
    axios.post(`/api/blogs/comment/${blogid}`,comment)
    .then(res => dispatch({
        type:GET_BLOG,
        payload:res.data
    }))
    .catch(err=>dispatch({
        type:ERR_DISPATCH,
        payload:err.response.data
    }))
}


export const createBlog = (blogObj, history) =>
dispatch =>
{
    axios.post('/api/blogs/create', blogObj)
    .then(res => {
        dispatch(viewBlog(res.data._id));
        history.push('/blogs/section')
    })
    .catch(err=> dispatch({
        type:ERR_DISPATCH,
        payload:err.response.data
    }))

}

export const createSection = (sectionObj, blogId) =>
dispatch =>
{
    axios.post(`/api/blogs/create/${blogId}`, sectionObj)
    .then(res=> dispatch(viewBlog(res.data._id)))
    .catch(err=> dispatch({
        type:ERR_DISPATCH,
        payload:err.response.data
    }))
    
    

}


export const deleteSection = (id, sectionObj)=> dispatch =>
{
    axios.post(`/api/blogs/section/${id}`, sectionObj)
    .then(res => dispatch(viewBlog(res.data._id)))
    .catch(err=> dispatch(
        {
            type:ERR_DISPATCH,
            payload:err.response.data
        })
    )
}

export const deleteBlog = (id, history) =>
dispatch =>
{
    axios.delete(`/api/blogs/${id}`)
    .then(res => history.push('/blogger'))
    .catch(err=> dispatch({
        type:ERR_DISPATCH,
        payload:err.response.data
    }))
}


export const addLike = (id) =>
dispatch=>
{
    axios.post(`/api/blogs/like/${id}`)
    .then(res => dispatch(viewBlog(id)))
    .catch(err => dispatch({
        type:ERR_DISPATCH,
        payload:err.response.data
    }))
}



export const removeLike = (id) =>
dispatch=>
{
    axios.post(`/api/blogs/unlike/${id}`)
    .then(res => dispatch(viewBlog(id)))
    .catch(err => dispatch({
        type:ERR_DISPATCH,
        payload:err.response.data
    }))
}


