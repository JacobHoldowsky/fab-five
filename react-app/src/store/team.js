const GET_ALL_FOLLOWED_TEAMS = '/teams/GET_FOLLOWED_TEAMS'
const CREATE_NEW_TEAM = '/teams/CREATE_NEW_TEAM'
const DELETE_TEAM = '/teams/DELETE_TEAM'
const EDIT_TEAM = '/teams/EDIT_TEAM'
const CREATE_TEAM_COMMENT = '/teams/CREATE_TEAM_COMMENT'
const DELETE_TEAM_COMMENT = '/teams/DELETE_TEAM_COMMENT'
const EDIT_TEAM_COMMENT = '/teams/EDIT_TEAM_COMMENT'


const loadFollowedTeams = (teams) => {
    return {
        type: GET_ALL_FOLLOWED_TEAMS,
        teams
    }
}

const addTeam = (team) => {
    return {
        type: CREATE_NEW_TEAM,
        team
    }
}

const removeTeam = (team) => {
    return {
        type: DELETE_TEAM,
        team
    }
}

const updateTeam = (team) => {
    return {
        type: EDIT_TEAM,
        team
    }
}

const addTeamComment = (comment) => {
    return {
        type: CREATE_TEAM_COMMENT,
        comment
    }
}

const removeTeamComment = (comment) => {
    return {
        type: DELETE_TEAM_COMMENT,
        comment
    }
}

const updateTeamComment = (comment) => {
    return {
        type: EDIT_TEAM_COMMENT,
        comment
    }
}

export const getAllFollowedTeams = () => async (dispatch) => {
    const response = await fetch(`/api/teams/`);

    if (response.ok) {
        const data = await response.json();
        await dispatch(loadFollowedTeams(data))
        return data
    }
}

export const createTeam = (team) => async (dispatch) => {
    const response = await fetch(`/api/teams/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(team)
    })


    if (response.ok) {
        const data = await response.json()
        const team = await dispatch(addTeam(data))
        return team
    }
}

export const deleteTeam = (teamId) => async (dispatch) => {
    const response = await fetch(`/api/teams/${teamId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })


    if (response.ok) {
        const data = await response.json()
        const team = await dispatch(removeTeam(data))
        return team
    }
}

export const editTeam = (team, teamId) => async (dispatch) => {
    const response = await fetch(`/api/teams/${teamId}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(team)
    })

    if (response.ok) {
        const data = await response.json()
        const team = await dispatch(updateTeam(data))
        return team
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

export const deleteTeamComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/team_comments/${commentId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        const data = await response.json()
        const comment = await dispatch(removeTeamComment(data))
        return comment
    }
}

export const editTeamComment = (comment) => async (dispatch) => {
    const response = await fetch(`/api/team_comments/${comment.commentId}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    })

    if (response.ok) {
        const data = await response.json()
        const comment = await dispatch(updateTeamComment(data))
        return comment
    }
}

const initialState = {}

const teamsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_FOLLOWED_TEAMS: {
            const newState = { ...state }
            action.teams.teams.forEach((team) => (newState[team.id] = team))
            return newState
        }
        case CREATE_NEW_TEAM: {
            const newState = { ...state }
            newState[action.team.id] = action.team
            return newState
        }
        case DELETE_TEAM: {
            const newState = { ...state }
            delete newState[action.team.id]
            return newState
        }
        case EDIT_TEAM: {
            const newState = { ...state }
            newState[action.team.id] = action.team
            return newState
        }
        case CREATE_TEAM_COMMENT: {
            const newState = { ...state }
            newState[action.comment.team_id].team_comments[action.comment.id] = action.comment
            return newState
        }
        case DELETE_TEAM_COMMENT: {
            const newState = { ...state }
            delete newState[action.comment.team_id].team_comments[action.comment.id]
            return newState
        }
        case EDIT_TEAM_COMMENT: {
            const newState = { ...state }
            newState[action.comment.team_id].team_comments[action.comment.id] = action.comment
            return newState
        }
        default:
            return state
    }
}

export default teamsReducer