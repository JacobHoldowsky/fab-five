import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFollowedTeams } from "../store/team";
import { NavLink } from 'react-router-dom'
import './Teams.css'

const Teams = () => {
    const dispatch = useDispatch()
    const teams = useSelector((state) => Object.values(state.teams))
    const currentUser = useSelector((state) => state.session.user)



    useEffect(() => {
        dispatch(getAllFollowedTeams(currentUser.id))
    }, [dispatch, currentUser.id])

    return (
        <div className='team-page'>
            {teams?.map((team) => {
                const bestPlayer = team.players[0]
                const remainingPlayers = team.players.slice(1)
                const remainingPlayers1 = remainingPlayers.slice(0, 2)
                const remainingPlayers2 = remainingPlayers.slice(2)
                return (
                    <div className='team-and-logo'>
                        <div className='team-header'>
                                <NavLink to={`api/teams/${team.id}`}>
                                    <img className='team-logo' src={team.logo_src} alt="" />
                                </NavLink>
                            <div className='team-info'>
                                <NavLink className='team-full-name' to={`api/teams/${team.id}`}>
                                    {team.city} {team.name}
                                </NavLink>
                                <div> | </div>
                                <NavLink className='team-owner' to={`api/users/${team.user_id}`}>
                                    {team.user_username}
                                </NavLink>
                            </div>
                        </div>
                        <div className='team'>

                            <div className='best-player'>
                                <NavLink to={`api/players/${bestPlayer.id}`}>
                                    <img className='best-player-img' src={bestPlayer.headshot_src} alt="" />
                                </NavLink>
                            </div>
                            <div className='remaining-players'>
                                <div className='remaining-players-1'>
                                    {remainingPlayers1.map((player) => {
                                        return <>
                                            <div className='remaining-player'>
                                                <NavLink to={`api/players/${player.id}`}>
                                                    <img className='remaining-player-img' src={player.headshot_src} alt="" />
                                                </NavLink>
                                            </div>
                                        </>
                                    })}
                                </div>
                                <div className='remaining-players-2'>
                                    {remainingPlayers2.map((player) => {
                                        return <>
                                            <div className='remaining-player'>
                                                <NavLink to={`api/players/${player.id}`}>
                                                    <img className='remaining-player-img' src={player.headshot_src} alt="" />
                                                </NavLink>
                                            </div>
                                        </>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div >
    )
}

export default Teams