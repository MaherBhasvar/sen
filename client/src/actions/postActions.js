import axios from 'axios';

import {SET_SORT_TYPE, ADD_POST, GET_ERRORS, GET_POSTS,  POST_LOADING, DELETE_POST, GET_POST, CLEAR_ERRORS, SEARCH_TERM} from './types';

//setSortType
export const setSortType = sortTypes => dispatch => {
  console.log("set sort action")
  console.log(sortTypes);
  dispatch({
    type: SET_SORT_TYPE,
    payload: sortTypes,
  });

}

export const addViewCount = (postId) => dispatch => {
  axios.post(`/api/posts/views/${postId}`)
    .then(res => console.log("view added"))
    .catch(err => console.log("add view error", err));
}


//add post
export const addPost = postData => dispatch => {
  dispatch(clearErrors());
    axios 
        .post('/api/posts', postData)
        .then (res => 
            dispatch ({
                type: ADD_POST,
                payload: res.data,
            }))
        .catch (err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }));
};

// Get Posts
export const getPosts = () => dispatch => {
  dispatch(clearErrors());
    dispatch(setPostLoading());
    axios
      .get('/api/posts')
      .then(res =>
        dispatch({
          type: GET_POSTS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_POSTS,
          payload: null
        })
      );
  };


// Get Post
export const getPost = id => dispatch => {

  dispatch(clearErrors());
    dispatch(setPostLoading());
    axios
      .get(`/api/posts/${id}`)
      .then(res =>
        dispatch({
          type: GET_POST,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_POST,
          payload: null
        })
      );
  };
  
  
// Delete Post
export const deletePost = id => dispatch => {
  dispatch(clearErrors());
    axios
      .delete(`/api/posts/${id}`)
      .then(res =>
        dispatch({
          type: DELETE_POST,
          payload: id
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
};
  
// Add Like
export const addLike = id => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getPosts()) )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Add Report
export const addReport = id => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/report/${id}`)
    .then(res => dispatch(getPosts()) )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Add Dislike
export const addDislike = id => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/dislike/${id}`)
    .then(res => dispatch(getPosts()) )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Remove Like
export const removeLike = id => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/removelike/${id}`)
    .then(res => dispatch(getPosts()) )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//Remove Dislike
export const removeDislike = id => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/removedislike/${id}`)
    .then(res => dispatch(getPosts()) )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//Remove report
export const removeReport = id => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/removereport/${id}`)
    .then(res => dispatch(getPosts()) )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};



  // Delete Post From View
export const deletePostFromView = id => dispatch => {
  dispatch(clearErrors());
  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Like From View
export const addLikeFromView = id => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getPost(id)) )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Add Dislike From View
export const addDislikeFromView = id => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/dislike/${id}`)
    .then(res => dispatch(getPost(id)) )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Add Report From View
export const addReportFromView = id => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/report/${id}`)
    .then(res => dispatch(getPost(id)) )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Remove Like From View
export const removeLikeFromView = id => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/removelike/${id}`)
    .then(res => dispatch(getPost(id)) )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Remove Dislike From View
export const removeDislikeFromView = id => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/removedislike/${id}`)
    .then(res => dispatch(getPost(id)) )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Remove Report From View
export const removeReportFromView = id => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/removereport/${id}`)
    .then(res => dispatch(getPost(id)) )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};





  
// Add Comment
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  dispatch(clearErrors());
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// Set loading state
export const setPostLoading = () => {
    return {
      type: POST_LOADING
    };
  };

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

/********************************************************* */
/********************************************************* */
/********************************************************* */
//search actions
/********************************************************* */
/********************************************************* */
/********************************************************* */

// Post search term
export const newSearch = (searchData, history) => dispatch => {
  dispatch(clearErrors());
  dispatch(setPostLoading(searchData));
  console.log("post new search");
  axios.post('/api/search', searchData)
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
      console.log(res.data);
      history.push(`/search/${searchData.search}`);
    }
    )
    .catch(err =>{
      dispatch({
        type: GET_POSTS,
        payload: null
      })
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
            
    }
    );
};

//get new term
export const getNewSearch = (search, history) => dispatch => {
dispatch(clearErrors());
dispatch(setSearchTerm(search));
console.log("get New Search");
axios
  .get(`/api/search/${search}`)
  .then(res =>{
    dispatch(setSearchTerm());
    dispatch({
      type: GET_POSTS,
      payload: res.data
    })
    console.log(search)
    console.log("search done");
    console.log(res.data);
//      history.push(`/search/${search}`)
  }
  )
  .catch(err =>{
    console.log(err);
    dispatch({
      type: GET_POSTS,
      payload: null
    });
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
    console.log("errors from get new search")
    console.log(search)
    console.log(err.response.data);    
  }
  );
}

//set global search term
export const setSearchTerm = (searchData) => dispatch => {
dispatch(clearErrors());
  return {
    type: SEARCH_TERM,
    payload: searchData
  };
};