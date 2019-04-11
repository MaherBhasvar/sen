import axios from 'axios';

import  {GET_ERRORS, SEARCH_RESULT ,SEARCH_LOADING, SEARCH_TERM, CLEAR_ERRORS} from './types';


// Set loading state
export const setSearchLoading = () => {
//  dispatch(clearErrors()) ;
    return {
      type: SEARCH_LOADING
    };
  };

// Set Search Ter, loading state
export const setSearchTerm = (searchData) => dispatch => {
  dispatch(clearErrors());
    return {
      type: SEARCH_TERM,
      payload: searchData
    };
  };

export const newSearch = (searchData, history) => dispatch => {
//  dispatch(clearErrors());
    dispatch(setSearchLoading());
    dispatch(setSearchTerm(searchData));

    console.log(searchData);
    axios.post('/api/search', searchData)
      .then(res => {            
          dispatch ({
          type: SEARCH_RESULT,
          payload: res.data,
      });
      history.push(`/search/${searchData.search}`)
    })
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        );
    
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};