import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import  {GET_ERRORS, SEARCH_RESULT ,SEARCH_LOADING, SEARCH_TERM} from './types';


// Set loading state
export const setSearchLoading = () => {
    return {
      type: SEARCH_LOADING
    };
  };

// Set Search Ter, loading state
export const setSearchTerm = (searchData) => {
    return {
      type: SEARCH_TERM,
      payload: searchData
    };
  };

export const newSearch = (searchData, history) => dispatch => {
    dispatch(setSearchLoading());
    dispatch(setSearchTerm(searchData));

    console.log(searchData);
    axios.post('/api/search', searchData)
    .then(res =>             
        dispatch ({
        type: SEARCH_RESULT,
        payload: res.data,
    }))
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        );
    
};