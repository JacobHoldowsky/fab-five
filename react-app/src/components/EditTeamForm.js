import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router"
import { getAllPlayers } from "../store/player"
import { editTeam } from "../store/team"
import './EditTeamForm.css'


const EditTeamForm = () => {
    const { teamId } = useParams()
    const team = useSelector(state => state.teams[teamId])
    const history = useHistory()
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const [city, setCity] = useState(team.city)
    const [name, setName] = useState(team.name)
    const [logo, setLogo] = useState(team.logo_src)
    const [logoLoading, setLogoLoading] = useState(false)
    const [player_one, setPlayerOne] = useState(team.players[0].id)
    const [player_two, setPlayerTwo] = useState(team.players[1].id)
    const [player_three, setPlayerThree] = useState(team.players[2].id)
    const [player_four, setPlayerFour] = useState(team.players[3].id)
    const [player_five, setPlayerFive] = useState(team.players[4].id)
    const players = useSelector((state) => Object.values(state.players))

    useEffect(() => {
        dispatch(getAllPlayers())
    }, [dispatch])

    const onSubmit = async (e) => {
        e.preventDefault()

        setErrors([])

        const formData = new FormData()

        if ((player_one === player_two || player_one === player_three || player_one === player_four || player_one === player_five)
            || (player_two === player_three || player_two === player_four || player_two === player_five)
            || (player_three === player_four || player_three === player_five)
            || (player_four === player_five)) {
            setErrors((errors) => [...errors, 'Please select five unique players.'])
        }
        if (city.length > 50) setErrors((errors) => [...errors, 'City name must be no more than 50 characters.'])
        if (name.length > 50) setErrors((errors) => [...errors, 'Team name must be no more than 50 characters.'])
        // if (!logo.includes('https://cdn.nba.com/logos/nba/') || !logo.includes('/primary/L/logo.svg')) {
        //     setErrors((errors) => [...errors, 'Please enter a team image url from nba.com/teams.'])
        // }

        if ((player_one !== player_two && player_one !== player_three && player_one !== player_four && player_one !== player_five)
            && (player_two !== player_three && player_two !== player_four && player_two !== player_five)
            && (player_three !== player_four && player_three !== player_five)
            && (player_four !== player_five)
            && city.length <= 50
            && name.length <= 50
            // && (logo.includes('https://cdn.nba.com/logos/nba/') && logo.includes('/primary/L/logo.svg'))
        ) {

            formData.append('city', city)
            formData.append('name', name)
            formData.append('logo', logo)
            formData.append('player_one', parseInt(player_one))
            formData.append('player_two', parseInt(player_two))
            formData.append('player_three', parseInt(player_three))
            formData.append('player_four', parseInt(player_four))
            formData.append('player_five', parseInt(player_five))

            const editedTeam = await dispatch(editTeam(formData, teamId))

            if (editedTeam) setLogoLoading(false)

            setCity('')
            setName('')
            setLogo('')
            setPlayerOne(null)
            setPlayerTwo(null)
            setPlayerThree(null)
            setPlayerFour(null)
            setPlayerFive(null)


            history.push(`/teams/${teamId}`)
            return editedTeam
        } else {

        }
    }

    const updateLogo = (e) => {
        const file = e.target.files[0];
        setLogo(file);
    }

    return (
        <>
            <h1>New Team Form</h1>
            <div className='new-team-form-cont'>
                <h2>Edit your team!</h2>
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
                    </div>
                    <div className='player-dropdowns'>
                        <div className='form-div'>
                            <label htmlFor="player_one">Player One:</label>
                            <select
                                id='player_one'
                                type="text"
                                name="player_one"
                                onChange={(e) => setPlayerOne(parseInt(e.target.value))}
                                defaultValue={team.players[0].id}
                            >
                                <option value={team.players[0].id} disabled hidden>{team.players[0].first_name} {team.players[0].last_name}</option>
                                {players?.map((player) => (
                                    <option key={player.id} value={player.id}>{player.first_name} {player.last_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='form-div'>
                            <label htmlFor="player_two">Player Two:</label>
                            <select
                                id='player_two'
                                type="text"
                                name="player_two"
                                onChange={(e) => setPlayerTwo(parseInt(e.target.value))}
                                defaultValue={team.players[1].id}
                            >
                                <option value={team.players[1].id} disabled hidden>{team.players[1].first_name} {team.players[1].last_name}</option>
                                {players?.map((player) => (
                                    <option key={player.id} value={parseInt(player.id)}>{player.first_name} {player.last_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='form-div'>
                            <label htmlFor="player_three">Player Three:</label>
                            <select
                                id='player_three'
                                type="text"
                                name="player_three"
                                onChange={(e) => setPlayerThree(parseInt(e.target.value))}
                                defaultValue={team.players[2].id}
                            >
                                <option value={team.players[2].id} disabled hidden>{team.players[2].first_name} {team.players[2].last_name}</option>
                                {players?.map((player) => (
                                    <option key={player.id} value={player.id}>{player.first_name} {player.last_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='form-div'>
                            <label htmlFor="player_four">Player Four:</label>
                            <select
                                id='player_four'
                                type="text"
                                name="player_four"
                                onChange={(e) => setPlayerFour(parseInt(e.target.value))}
                                defaultValue={team.players[3].id}
                            >
                                <option value={team.players[3].id} disabled hidden>{team.players[3].first_name} {team.players[3].last_name}</option>
                                {players?.map((player) => (
                                    <option key={player.id} value={player.id}>{player.first_name} {player.last_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='form-div'>
                            <label htmlFor="player_five">Player Five:</label>
                            <select
                                id='player_five'
                                type="text"
                                name="player_five"
                                onChange={(e) => setPlayerFive(parseInt(e.target.value))}
                                defaultValue={team.players[4].id}
                            >
                                <option value={team.players[4].id} disabled hidden>{team.players[4].first_name} {team.players[4].last_name}</option>
                                {players?.map((player) => (
                                    <option key={player.id} value={player.id}>{player.first_name} {player.last_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='btn-div'>
                        <button onClick={() => history.push(`/teams/${teamId}`)}>Cancel</button>
                        <button type='submit'>Submit</button>
                    </div>
                    {(logoLoading) && <p>Loading...</p>}
                </form>
            </div>
        </>
    )
}

export default EditTeamForm