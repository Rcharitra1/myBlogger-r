import { TEST_DISPATCH } from "./types_SD"



export const registerUser = (userData)=>{
    return{
        type: TEST_DISPATCH,
        payload:userData
    }
}