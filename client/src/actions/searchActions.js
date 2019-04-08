import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import  {GET_ERRORS, SEARCH} from './types';


//Register User
export const newSearch = (userData) => dispatch => {
    axios.post('/api/users/register', userData)
    .then(res =>             
        dispatch ({
        type: SEARCH,
        payload: res.data,
    }))
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        );
};