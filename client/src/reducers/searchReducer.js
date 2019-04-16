import {SEARCH_RESULT ,SEARCH_LOADING, SEARCH_TERM} from '../actions/types';

const initialState = {
    posts: [],
    post: {},
    loading: false,
    searchData: '',
};

export default function (state = initialState, action ) {
    switch(action.type) {
        case SEARCH_RESULT:
            return {
                ...state,
                loading: false,
                posts: action.payload,
            };
        case SEARCH_TERM: 
            return {
                ...state,
                searchData: action.payload,
            }
        case SEARCH_LOADING: 
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
}