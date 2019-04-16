import {SET_SORT_TYPE ,ADD_POST, GET_POSTS, POST_LOADING, GET_POST, DELETE_POST} from '../actions/types';

const initialState = {
    posts: [],
    post: {},
    sortTypes: {
        sortType1 :'Date',
        sortType2 : 'Descending',
    },
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
    case SET_SORT_TYPE:
{      console.log("from post reducer", action.payload);
      return {
        ...state,
        sortTypes: action.payload,
      };}
      case POST_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_POSTS:
        return {
          ...state,
          posts: action.payload,
          loading: false
        };
      case GET_POST:
        return {
          ...state,
          post: action.payload,
          loading: false
        };
      case ADD_POST:
        return {
          ...state,
          posts: [action.payload, ...state.posts]
        };
      case DELETE_POST:
        return {
          ...state,
          posts: state.posts.filter(post => post._id !== action.payload)
        };
        default:
        console.log("default reducer")
            return state;
    }
}