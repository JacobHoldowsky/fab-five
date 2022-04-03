const GET_ALL_PLAYERS = 'players/GET_ALL_PLAYERS'

const loadPlayers = (players) => {
    return {
        type: GET_ALL_PLAYERS,
        players
    }
}

export const getAllPlayers = () => async (dispatch) => {
    const response = await fetch ('/api/players/')
    if (response.ok) {
        const data = await response.json();
        console.log('DATA',data)
        dispatch(loadPlayers(data))
        return data
    }
}

const initialState = {};

const playersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PLAYERS: {
            const newState = {}
            action.players.players.forEach((player) => (newState[player.id] = player))
            return newState
        }
        default:
            return state
    }
}

export default playersReducer