import { SET_USER_DISPATCH, ERR_DISPATCH } from "./types_SD";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import authorizedJwtToken from '../utils/authorizedJwtToken'


export const registerUser = (userData, history) => dispatch =>{
    axios
    .post('/api/users/register', userData)
    .then(res=> history.push('/login'))
    .catch(err=> 
        dispatch({
            type:ERR_DISPATCH,
            payload: err.response.data
        }));    
};


export const loginUser = (userData)=> dispatch=>{
    axios
    .post('/api/users/login', userData)
    .then(res=> 
        {
            const {token}=res.data;
            localStorage.setItem('jwtToken', token);
            authorizedJwtToken(token);
            const decodeJwt= jwt_decode(token);
            dispatch(setUser(decodeJwt));
        }).catch(err=> 
            dispatch({
            type:ERR_DISPATCH,
            payload:err.response.data
        }))
}


export const setUser=(decodeJwt)=>{
    return{
        type:SET_USER_DISPATCH,
        payload:decodeJwt
    }
}

export const logoutUser=()=> dispatch=>{
    localStorage.removeItem('jwtToken');

    delete axios.defaults.headers.common['Authorization'];
    dispatch(setUser({}))

}

