import {GET_ALL_BLOGS, GET_BLOG, LOAD_BLOG_DISPATCH} from '../actions/types_SD';
const initialState={
    blogger:null,
    blog:null,
    loading:false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state=initialState, action){
    switch(action.type){
        case GET_ALL_BLOGS:
            return{
                ...state,
                blog:action.payload,
                loading:false
            }
            
        case LOAD_BLOG_DISPATCH:
            return {
                ...state,
                blog:null,
                loading:true
            }
        case GET_BLOG:
            return{
                ...state,
                blog:action.payload,
                loading:false
            }

        default:
            return state;
    }
}