const GET_ALL_POSTS = '/posts/GET_ALL_POSTS'
const CREATE_POST_COMMENT = '/posts/CREATE_POST_COMMENT'
const CREATE_TEAM_COMMENT = '/posts/CREATE_TEAM_COMMENT'

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

const addTeamComment = (comment) => {
    return {
        type: CREATE_TEAM_COMMENT,
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
        console.log('data', data)
        const comment = await dispatch(addPostComment(data))
        return comment
    }
}

export const createTeamComment = (comment, teamId) => async (dispatch) => {
    const response = await fetch(`/api/team_comments/${teamId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    })

    if (response.ok) {
        const data = await response.json()
        const comment = await dispatch(addTeamComment(data))
        return comment
    }
}

const initialState = {};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POSTS: {
            const newState = {}
            action.posts.posts.forEach((post) => (newState[post.id] = post))
            // action.posts.posts.forEach((post) => (newState[post.id].post_comments.forEach((comment) => post.post_comments[comment.id] = comment)))
            return newState
        }
        case CREATE_POST_COMMENT: {
            const newState = { ...state }
            // newState[action.comment.post_id].post_comments = [action.comment, ...newState[action.comment.post_id].post_comments]
            newState[action.comment.post_id].post_comments[action.comment.id] = action.comment
            // newState[action.comment.post_id].post_comments.forEach((comment) => newState[action.comment.post_id].post_comments[comment.id] = comment)
            return newState
        }
        case CREATE_TEAM_COMMENT: {
            const newState = { ...state }
            newState[action.comment.team_id].team_comments[action.comment.id] = action.comment
            return newState
        }
        default:
            return state
    }
}

export default postsReducer