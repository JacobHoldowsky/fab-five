const GET_ALL_FOLLOWED_TEAMS = '/teams/GET_FOLLOWED_TEAMS'
const CREATE_TEAM_COMMENT = '/posts/CREATE_TEAM_COMMENT'


const loadFollowedTeams = (teams) => {
    return {
        type: GET_ALL_FOLLOWED_TEAMS,
        teams
    }
}
const addTeamComment = (comment) => {
    return {
        type: CREATE_TEAM_COMMENT,
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

export const createTeamComment = (comment, teamId) => async (dispatch) => {

    const response = await fetch(`/api/team_comments/${teamId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    })

    console.log('RESPONSE', response)

    if (response.ok) {
        const data = await response.json()
        console.log('data', data)
        const comment = await dispatch(addTeamComment(data))
        return comment
    }
}

const initialState = {}

const teamsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_FOLLOWED_TEAMS: {
            const newState = {...state}
            action.teams.teams.forEach((team) => (newState[team.id] = team))
            return newState
        }
        case CREATE_TEAM_COMMENT: {
            const newState = { ...state }
            console.log('NEWSTATE', newState[action.comment.team_id])
            console.log()
            newState[action.comment.team_id].team_comments[action.comment.id] = action.comment
            return newState
        }
        default:
            return state
    }
}

export default teamsReducer