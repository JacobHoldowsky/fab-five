import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllPlayers } from "../store/player"


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
    },[dispatch])

    return (
        <>
            <h1>New Team Form</h1>
            <form>
                <h2>Build your new team!</h2>
                <div>
                    <label htmlFor="city">Team City:</label>
                    <input
                        id='city'
                        type="text"
                        name='city'
                        onChange={(e) => setCity(city)}
                        value={city}
                    />
                </div>
                <div>
                    <label htmlFor="name">Team Name:</label>
                    <input
                        id='name'
                        type="text"
                        name="name"
                        onChange={(e) => setName(name)}
                        value={name}
                    />
                </div>
                <div>
                    <label htmlFor="logo">Team logo:</label>
                    <input
                        id='logo'
                        type="text"
                        name="logo"
                        onChange={(e) => setLogo(logo)}
                        value={logo}
                    />
                </div>
                <div>
                    <label htmlFor="player1">Player One:</label>
                    <select
                        id='player-one'
                        type="text"
                        name="player-one"
                        onChange={(e) => setPlayerOne(playerOne)}
                        value={playerOne}
                    >
                        {players?.map((player) => (
                            // <option value={player} name="player-one" id="player-one">{player.first_name} {player.last_name}</option>
                            <option value={playerOne}>{player.first_name} {player.last_name}</option>
                        ))}
                    </select>


                </div>
            </form>
        </>
    )
}

export default NewTeamForm