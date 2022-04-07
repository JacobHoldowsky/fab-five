import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllPlayers } from "../store/player"
import { createTeam } from "../store/team"


const NewTeamForm = () => {
    const dispatch = useDispatch()
    const [city, setCity] = useState('')
    const [name, setName] = useState('')
    const [logo, setLogo] = useState('')
    const [playerOne, setPlayerOne] = useState(null)
    const [playerTwo, setPlayerTwo] = useState(null)
    const [playerThree, setPlayerThree] = useState(null)
    const [playerFour, setPlayerFour] = useState(null)
    const [playerFive, setPlayerFive] = useState(null)

    const players = useSelector((state) => Object.values(state.players))

    useEffect(() => {
        dispatch(getAllPlayers())
    }, [dispatch])

    const onSubmit = (e) => {
        e.preventDefault()

        const team = {
            city,
            name,
            logo,
            players: [
                playerOne,
                playerTwo,
                playerThree,
                playerFour,
                playerFive
            ]
        }

        dispatch(createTeam(team))

        setCity('')
        setName('')
        setLogo('')
        setPlayerOne(null)
        setPlayerTwo(null)
        setPlayerThree(null)
        setPlayerFour(null)
        setPlayerFive(null)
    }

    return (
        <>
            <h1>New Team Form</h1>
            <form onSubmit={onSubmit}>
                <h2>Build your new team!</h2>
                <div>
                    <label htmlFor="city">Team City:</label>
                    <input
                        id='city'
                        type="text"
                        name='city'
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                    />
                </div>
                <div>
                    <label htmlFor="name">Team Name:</label>
                    <input
                        id='name'
                        type="text"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>
                <div>
                    <label htmlFor="logo_src">Team logo:</label>
                    <input
                        id='logo_src'
                        type="text"
                        name="logo_src"
                        onChange={(e) => setLogo(e.target.value)}
                        value={logo}
                    />
                </div>
                <div>
                    <label htmlFor="playerOne">Player One:</label>
                    <select
                        id='player-one'
                        type="text"
                        name="player-one"
                        onChange={(e) => setPlayerOne(playerOne)}
                        value={playerOne}
                    >
                        {players?.map((player) => (
                            <option value={playerOne}>{player.first_name} {player.last_name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="player-two">Player Two:</label>
                    <select
                        id='player-two'
                        type="text"
                        name="player-two"
                        onChange={(e) => setPlayerTwo(playerTwo)}
                        value={playerTwo}
                    >
                        {players?.map((player) => (
                            <option value={playerTwo}>{player.first_name} {player.last_name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="player-three">Player Three:</label>
                    <select
                        id='player-three'
                        type="text"
                        name="player-three"
                        onChange={(e) => setPlayerThree(playerThree)}
                        value={playerThree}
                    >
                        {players?.map((player) => (
                            <option value={playerThree}>{player.first_name} {player.last_name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="player-four">Player Four:</label>
                    <select
                        id='player-four'
                        type="text"
                        name="player-four"
                        onChange={(e) => setPlayerFour(playerFour)}
                        value={playerFour}
                    >
                        {players?.map((player) => (
                            <option value={playerFour}>{player.first_name} {player.last_name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="player-five">Player Five:</label>
                    <select
                        id='player-five'
                        type="text"
                        name="player-five"
                        onChange={(e) => setPlayerFive(playerFive)}
                        value={playerFive}
                    >
                        {players?.map((player) => (
                            <option value={playerFive}>{player.first_name} {player.last_name}</option>
                        ))}
                    </select>
                </div>
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default NewTeamForm