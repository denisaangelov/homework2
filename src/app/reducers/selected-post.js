import { SELECT_POST } from '../actions/list';

const selectedPost = (state = null, action) => {
    switch (action.type) {
        case SELECT_POST:
            return action.post;
        default:
            return state;
    }
};

export default selectedPost;