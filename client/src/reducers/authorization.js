import {TEST_DISPATCH} from '../actions/types_SD';
// import autherizeActions from '../actions/autherizeActions';
const initialState={
    isAuthenticated:false,
    user:{}
}

const authorization=(state= initialState, action)=>{

    switch(action.type)
    {
        case TEST_DISPATCH:
            return {
                ...state,
                user:action.payload
            }
        default:
            return state;
    }
}

export default authorization;