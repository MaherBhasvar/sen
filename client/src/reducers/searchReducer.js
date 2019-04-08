import {SEARCH} from '../actions/types';

const initialState = {
    posts: [],
    post: {},
    loading: false,
}

export default function (state = initialState, action ) {
    switch(action.type) {
        case SEARCH:
            return {
                ...state,
            }
        default:
            return state;
    }
}