import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory } from "react-router"
import { getAllPlayers } from "../store/player"
import { createTeam } from "../store/team"


const NewTeamForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [city, setCity] = useState('')
    const [name, setName] = useState('')
    const [logo, setLogo] = useState('')
    const [player_one, setPlayerOne] = useState('lol')
    const [player_two, setPlayerTwo] = useState(null)
    const [player_three, setPlayerThree] = useState(null)
    const [player_four, setPlayerFour] = useState(null)
    const [player_five, setPlayerFive] = useState(null)

    const players = useSelector((state) => Object.values(state.players))

    useEffect(() => {
        dispatch(getAllPlayers())
    }, [dispatch])

    const onSubmit = async (e) => {
        e.preventDefault()

        console.log('PLAYERONE',parseInt(player_one) + parseInt(player_four))

        const team = {
            city,
            name,
            logo,
            player_one: parseInt(player_one),
            player_two: parseInt(player_two),
            player_three: parseInt(player_three),
            player_four: parseInt(player_four),
            player_five: parseInt(player_five)
        }

        console.log('TEAM',team)

        const newTeam = await dispatch(createTeam(team))

        // setCity('')
        // setName('')
        // setLogo('')
        // setPlayerOne(null)
        // setPlayerTwo(null)
        // setPlayer_three(null)
        // setPlayer_four(null)
        // setPlayer_five(null)

        console.log(newTeam)

        history.push(`/teams/${newTeam.team.id}`)
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
                    <label htmlFor="player_one">Player One:</label>
                    <select
                        id='player_one'
                        type="text"
                        name="player_one"
                        onChange={(e) => setPlayerOne(e.target.value)}
                        value={player_one}
                    >
                        {players?.map((player) => (
                            <option value={player.id}>{player.first_name} {player.last_name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="player_two">Player Two:</label>
                    <select
                        id='player_two'
                        type="text"
                        name="player_two"
                        onChange={(e) => setPlayerTwo(e.target.value)}
                    >
                        {players?.map((player) => (
                            <option value={parseInt(player.id)}>{player.first_name} {player.last_name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="player_three">Player Three:</label>
                    <select
                        id='player_three'
                        type="text"
                        name="player_three"
                        onChange={(e) => setPlayerThree(e.target.value)}
                    >
                        {players?.map((player) => (
                            <option value={player.id}>{player.first_name} {player.last_name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="player_four">Player Four:</label>
                    <select
                        id='player_four'
                        type="text"
                        name="player_four"
                        onChange={(e) => setPlayerFour(e.target.value)}
                    >
                        {players?.map((player) => (
                            <option value={player.id}>{player.first_name} {player.last_name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="player_five">Player Five:</label>
                    <select
                        id='player_five'
                        type="text"
                        name="player_five"
                        onChange={(e) => setPlayerFive(e.target.value)}
                    >
                        {players?.map((player) => (
                            <option value={player.id}>{player.first_name} {player.last_name}</option>
                        ))}
                    </select>
                </div>
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default NewTeamForm