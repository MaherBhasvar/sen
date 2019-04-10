import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import  {GET_ERRORS, SET_CURRENT_USER} from './types';
import {getProfileByHandle} from './profileActions';

//Register User
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        );
};

// set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}


//Login - Get User Token
export const loginUser = userData => dispatch => {
    axios.post('./api/users/login', userData)
    .then(res => {
        //save to local storeage
        const {token} = res.data;
        //set token to ls
        localStorage.setItem('jwtToken', token);//everything stored as a string so conver to string
        //set token to auth header
        setAuthToken(token);
        //Decode token to get user data
        const decoded = jwt_decode(token);
        //set current user
        dispatch(setCurrentUser(decoded));
//        dispatch(getProfileByHandle())
    })
    .catch(err =>dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
}


//Log out user
export const logoutUser = () => dispatch => {
    //Remove token from local storage
    localStorage.removeItem('jwtToken');
    //Remove auth header for future requests
    setAuthToken(false);
    //Set current User to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));

}