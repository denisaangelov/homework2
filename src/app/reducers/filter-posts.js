import { FILTER_POSTS } from '../actions/list';

const filterPosts = (state = { filter: 'All' }, action) => {
    switch (action.type) {
        case FILTER_POSTS:
            return Object.assign({}, state, { filter: action.filter });
        default:
            return state;
    }
};

export default filterPosts;