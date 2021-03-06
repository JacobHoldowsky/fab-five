import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { getAllPlayers } from "../store/player"
import { createTeam } from "../store/team"
import './NewTeamForm.css'


const NewTeamForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState([])
    const [city, setCity] = useState('')
    const [name, setName] = useState('')
    const [logo, setLogo] = useState('')
    const [logoLoading, setLogoLoading] = useState(false)
    const [player_one, setPlayerOne] = useState(null)
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
        setSubmitted(true)
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
        if (!logo.name.includes('svg') && !logo.name.includes('jpeg') && !logo.name.includes('jpg') && !logo.name.includes('png')) {
            setErrors((errors) => [...errors, 'Please insert a logo file with one of following extensions: .jpeg, jpg, .svg, .png'])
        }

        if ((player_one !== player_two && player_one !== player_three && player_one !== player_four && player_one !== player_five)
            && (player_two !== player_three && player_two !== player_four && player_two !== player_five)
            && (player_three !== player_four && player_three !== player_five)
            && (player_four !== player_five)
            && city.length <= 50
            && name.length <= 50 && 
            (logo.name.includes('svg') || logo.name.includes('jpeg') || logo.name.includes('jpg') || logo.name.includes('png')))
         {


            formData.append('city', city)
            formData.append('name', name)
            formData.append('logo', logo)
            formData.append('player_one', parseInt(player_one))
            formData.append('player_two', parseInt(player_two))
            formData.append('player_three', parseInt(player_three))
            formData.append('player_four', parseInt(player_four))
            formData.append('player_five', parseInt(player_five))

            console.log('logo',logo)

            const newTeam = await dispatch(createTeam(formData))

            if (newTeam) setLogoLoading(false)

            setCity('')
            setName('')
            setLogo('')
            setPlayerOne(null)
            setPlayerTwo(null)
            setPlayerThree(null)
            setPlayerFour(null)
            setPlayerFive(null)

            setSubmitted(false)
            history.push(`/teams/${newTeam.team?.id}`)
        } else {
            setSubmitted(false)
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
                <h2>Build your new team!</h2>
                <form className='new-team-form' onSubmit={onSubmit}>
                    <div>
                        {errors.map((error, i) => (
                            <div className='error' key={i}>{error}</div>
                        ))}
                    </div>
                    <div className='form-inputs'>
                        <div className='form-div'>
                            <label htmlFor="city">Team City</label>
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
                            <label htmlFor="name">Team Name</label>
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
                            <label htmlFor="logo_src">Team Logo</label>
                                <input
                                    id='logo_src'
                                    type="file"
                                    name="logo_src"
                                    accept="image/*"
                                    onChange={updateLogo}
                                    // value={logo}
                                    // placeholder='From nba.com/teams'
                                    required
                                />
                        </div>
                    </div>
                    <div className='player-dropdowns'>
                        <div className='form-div'>
                            <label htmlFor="player_one">Player One</label>
                            <select
                                id='player_one'
                                type="text"
                                name="player_one"
                                onChange={(e) => setPlayerOne(e.target.value)}
                            >
                                <option value="" disabled selected hidden>Please Choose...</option>
                                {players?.map((player) => (
                                    <option key={player.id} value={player.id}>{player.first_name} {player.last_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='form-div'>
                            <label htmlFor="player_two">Player Two</label>
                            <select
                                id='player_two'
                                type="text"
                                name="player_two"
                                onChange={(e) => setPlayerTwo(e.target.value)}
                            >
                                <option value="" disabled selected hidden>Please Choose...</option>
                                {players?.map((player) => (
                                    <option key={player.id} value={parseInt(player.id)}>{player.first_name} {player.last_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='form-div'>
                            <label htmlFor="player_three">Player Three</label>
                            <select
                                id='player_three'
                                type="text"
                                name="player_three"
                                onChange={(e) => setPlayerThree(e.target.value)}
                            >
                                <option value="" disabled selected hidden>Please Choose...</option>
                                {players?.map((player) => (
                                    <option key={player.id} value={player.id}>{player.first_name} {player.last_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='form-div'>
                            <label htmlFor="player_four">Player Four</label>
                            <select
                                id='player_four'
                                type="text"
                                name="player_four"
                                onChange={(e) => setPlayerFour(e.target.value)}
                            >
                                <option value="" disabled selected hidden>Please Choose...</option>
                                {players?.map((player) => (
                                    <option key={player.id} value={player.id}>{player.first_name} {player.last_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='form-div'>
                            <label htmlFor="player_five">Player Five</label>
                            <select
                                id='player_five'
                                type="text"
                                name="player_five"
                                onChange={(e) => setPlayerFive(e.target.value)}
                            >
                                <option value="" disabled selected hidden>Please Choose...</option>
                                {players?.map((player) => (
                                    <option key={player.id} value={player.id}>{player.first_name} {player.last_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='btn-div'>
                        <button disabled={submitted} type='submit'>Submit</button>
                    </div>
                    {(logoLoading) && <p>Loading...</p>}
                </form>
            </div>
        </>
    )
}

export default NewTeamForm