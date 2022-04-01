const GET_ALL_POSTS = '/posts/GET_ALL_POSTS'

const loadPosts = (posts) => {
    return {
        type: GET_ALL_POSTS,
        posts
    }
}

export const getAllPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts/');

    if (response.ok) {
        const data = await response.json();
        dispatch(loadPosts(data))
        return data
    }
}

const initialState = {};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POSTS: {
            const newState = {}
            action.posts.posts.forEach((post) => (newState[post.id] = post))
            return newState
        }
        default:
            return state

    }
}

export default postsReducer