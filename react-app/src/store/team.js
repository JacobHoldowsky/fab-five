const GET_ALL_FOLLOWED_TEAMS = '/teams/GET_FOLLOWED_TEAMS'

const loadFollowedTeams = (teams) => {
    return {
        type: GET_ALL_FOLLOWED_TEAMS,
        teams
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

const initialState = {}

const teamsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_FOLLOWED_TEAMS: {
            const newState = {}
            action.teams.teams.forEach((team) => (newState[team.id] = team))
            return newState
        }
        default:
            return state
    }
}

export default teamsReducer