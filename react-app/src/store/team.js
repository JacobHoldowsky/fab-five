const GET_ALL_FOLLOWED_TEAMS = '/teams/GET_FOLLOWED_TEAMS'
const CREATE_NEW_TEAM = '/teams/CREATE_NEW_TEAM'
const CREATE_TEAM_COMMENT = '/teams/CREATE_TEAM_COMMENT'


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

export const createTeam = (team) => async (dispatch) => {
    const response = await fetch(`/api/teams/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(team)
    })


    if (response.ok) {
        const data = await response.json()
        console.log('DATAAA',data)
        const team = await dispatch(addTeam(data))
        return team
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
        case CREATE_TEAM_COMMENT: {
            const newState = { ...state }
            console.log('NEWSTATE',newState)
            console.log('NEWCOMMENT', action.comment)
            newState[action.comment.team_id].team_comments[action.comment.id] = action.comment
            return newState
        }
        default:
            return state
    }
}

export default teamsReducer