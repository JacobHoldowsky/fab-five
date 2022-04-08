import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { getAllPlayers } from "../store/player"
import { createTeam } from "../store/team"
import './NewTeamForm.css'


const NewTeamForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const [city, setCity] = useState('')
    const [name, setName] = useState('')
    const [logo, setLogo] = useState('')
    const [player_one, setPlayerOne] = useState(1)
    const [player_two, setPlayerTwo] = useState(1)
    const [player_three, setPlayerThree] = useState(1)
    const [player_four, setPlayerFour] = useState(1)
    const [player_five, setPlayerFive] = useState(1)

    const players = useSelector((state) => Object.values(state.players))

    useEffect(() => {
        dispatch(getAllPlayers())
    }, [dispatch])

    const onSubmit = async (e) => {
        e.preventDefault()

        setErrors([])

        if ((player_one === player_two || player_one === player_three || player_one === player_four || player_one === player_five)
            || (player_two === player_three || player_two === player_four || player_two === player_five)
            || (player_three === player_four || player_three === player_five)
            || (player_four === player_five)) {
            setErrors((errors) => [...errors, 'Please select unique players.'])
        }
        if (city.length > 50) setErrors((errors) => [...errors, 'City name must be no more than 50 characters.'])
        if (name.length > 50) setErrors((errors) => [...errors, 'Team name must be no more than 50 characters.'])
        if (!logo.includes('.svg')) {
            setErrors((errors) => [...errors, 'Please enter a valid svg image url for the team logo.'])
        }

        if ((player_one !== player_two && player_one !== player_three && player_one !== player_four && player_one !== player_five)
            && (player_two !== player_three && player_two !== player_four && player_two !== player_five)
            && (player_three !== player_four && player_three !== player_five)
            && (player_four !== player_five)
            && city.length <= 50
            && name.length <= 50
            && (logo.includes('svg')
                || logo.includes('png')
                || logo.includes('jpg')
                || logo.includes('jpeg'))
        ) {

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



            const newTeam = await dispatch(createTeam(team))

            setCity('')
            setName('')
            setLogo('')
            setPlayerOne(null)
            setPlayerTwo(null)
            setPlayerThree(null)
            setPlayerFour(null)
            setPlayerFive(null)


            history.push(`/teams/${newTeam.team?.id}`)
        } else {

        }
    }

    return (
        <>
            <h1>New Team Form</h1>
            <div className='new-team-form-cont'>
                <h2>Build your new team!</h2>
                <form className='new-team-form' onSubmit={onSubmit}>
                    <div>
                        {errors.map((error, i) => (
                            <div className='error' key={i}>{error}</div>
                        ))}
                    </div>
                    <div className='form-inputs'>
                        <div className='form-div'>
                            <label htmlFor="city">Team City:</label>
                            <input
                                id='city'
                                type="text"
                                name='city'
                                onChange={(e) => setCity(e.target.value)}
                                value={city}
                                required
                            />
                        </div>
                        <div className='form-div'>
                            <label htmlFor="name">Team Name:</label>
                            <input
                                id='name'
                                type="text"
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                            />
                        </div>
                        <div className='form-div'>
                            <label htmlFor="logo_src">Team logo:</label>
                            <input
                                id='logo_src'
                                type="text"
                                name="logo_src"
                                onChange={(e) => setLogo(e.target.value)}
                                value={logo}
                                required
                            />
                        </div>
                    </div>
                    <div className='player-dropdowns'>
                        <div className='form-div'>
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
                        <div className='form-div'>
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
                        <div className='form-div'>
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
                        <div className='form-div'>
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
                        <div className='form-div'>
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
                    </div>
                    <div className='btn-div'>
                        <button type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default NewTeamForm