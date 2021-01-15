import { SET_USER_DISPATCH } from "../actions/types_SD";
import isEmpty from '../validations/isEmpty';
// import autherizeActions from '../actions/autherizeActions';
const initialState={
    isAuthenticated:false,
    user:{}
}

const authorization=(state= initialState, action)=>{

    switch(action.type)
    {
        case SET_USER_DISPATCH:
            return{
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user:action.payload
            }
       
        default:
            return state;
    }
}

export default authorization;