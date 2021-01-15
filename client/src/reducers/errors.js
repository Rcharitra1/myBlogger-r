import { ERR_DISPATCH } from "../actions/types_SD";


const initialState={};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initialState, action){
    switch(action.type){
        case ERR_DISPATCH:
            return action.payload;
            default:
                return state
    }
};