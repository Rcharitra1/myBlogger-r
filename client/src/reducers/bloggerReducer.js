import {CLEAR_BLOGGER_DISPATCH, GET_BLOGGER_DISPATCH, LOAD_BLOGGER_DISPATCH} from '../actions/types_SD';
const initialState={
    blogger:null,
    bloggers:null,
    loading:false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state=initialState, action){
    switch(action.type){
        case GET_BLOGGER_DISPATCH:
            return{
                ...state,
                blogger:action.payload,
                loading:false
            }
            
        case LOAD_BLOGGER_DISPATCH:
            return {
                ...state,
                loading:true
            }
        case CLEAR_BLOGGER_DISPATCH:
            return {
                ...state,
                blogger:null
            }

        default:
            return state;
    }
}