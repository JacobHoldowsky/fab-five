const GET_ALL_POSTS = '/posts/GET_ALL_POSTS'
const CREATE_POST_COMMENT = '/posts/CREATE_POST_COMMENT'
const DELETE_POST_COMMENT = '/posts/DELETE_POST_COMMENT'
const EDIT_POST_COMMENT = '/posts/EDIT_POST_COMMENT'


const loadPosts = (posts) => {
    return {
        type: GET_ALL_POSTS,
        posts
    }
}

const addPostComment = (comment) => {
    return {
        type: CREATE_POST_COMMENT,
        comment
    }
}

const removePostComment = (comment) => {
    return {
        type: DELETE_POST_COMMENT,
        comment
    }
}

const updatePostComment = (comment) => {
    return {
        type: EDIT_POST_COMMENT,
        comment
    }
}



export const getAllPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts/');

    if (response.ok) {
        const data = await response.json();
        await dispatch(loadPosts(data))
        return data
    }
}

export const createPostComment = (comment, postId) => async (dispatch) => {
    const response = await fetch(`/api/post_comments/${postId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    })

    if (response.ok) {
        const data = await response.json()
        const comment = await dispatch(addPostComment(data))
        return comment
    }
}

export const deletePostComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/post_comments/${commentId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        const data = await response.json()
        const comment = await dispatch(removePostComment(data))
        return comment
    }
}

export const editPostComment = (comment) => async (dispatch) => {
    const response = await fetch(`/api/post_comments/${comment.commentId}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    })

    if (response.ok) {
        const data = await response.json()
        const comment = await dispatch(updatePostComment(data))
        return comment
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
        case CREATE_POST_COMMENT: {
            const newState = { ...state }
            newState[action.comment.post_id].post_comments[action.comment.id] = action.comment
            return newState
        }
        case DELETE_POST_COMMENT: {
            const newState = { ...state }
            delete newState[action.comment.post_id].post_comments[action.comment.id]
            return newState
        }
        case EDIT_POST_COMMENT: {
            const newState = { ...state }
            newState[action.comment.post_id].post_comments[action.comment.id] = action.comment
            return newState
        }
        default:
            return state
    }
}

export default postsReducer