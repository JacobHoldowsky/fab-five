import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFollowedTeams } from "../store/team";
import { NavLink } from 'react-router-dom'
import './Teams.css'
import { getAllPlayers } from "../store/player";

const Teams = () => {
    const dispatch = useDispatch()
    const teams = useSelector((state) => Object.values(state.teams))
    const currentUser = useSelector((state) => state.session.user)



    useEffect(() => {
        dispatch(getAllFollowedTeams(currentUser.id))
        dispatch(getAllPlayers())
    }, [dispatch, currentUser.id])

    return (
        <div className='team-page'>
            {teams?.map((team) => {

                const bestPlayer = team.players[0]
                let teamOverallRating = 0
                team.players.forEach((player) => teamOverallRating += player.overall_rating)
                const remainingPlayers = team.players.slice(1)
                const remainingPlayers1 = remainingPlayers.slice(0, 2)
                const remainingPlayers2 = remainingPlayers.slice(2)
                return (
                    <div key={team.id} className='team-and-logo'>
                        <div className='team-header'>
                            <NavLink to={`teams/${team.id}`}>
                                <img className='team-logo' src={team.logo_src} alt="" />
                            </NavLink>
                            <div className='team-info-and-overall'>
                                <div className='team-info'>
                                    <NavLink className='team-full-name' to={`teams/${team.id}`}>
                                        {team.city} {team.name}
                                    </NavLink>
                                    <div> | </div>
                                    <div className='overall-team-rating'>
                                        <div>
                                            {Math.round(teamOverallRating / 5)} Overall
                                        </div>
                                    </div>
                                    <div> | </div>
                                    <NavLink className='team-owner' to={`users/${team.user_id}`}>
                                        {team.user_username}
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className='team'>

                            <div className='best-player'>
                                <NavLink to={`players/${bestPlayer.id}`} player={bestPlayer}>
                                    <img className='best-player-img' src={bestPlayer.headshot_src} alt="" />
                                </NavLink>
                            </div>
                            <div className='remaining-players'>
                                <div className='remaining-players-1'>
                                    {remainingPlayers1.map((player) => (
                                        <div key={player.id} className='remaining-player'>
                                            <NavLink to={`players/${player.id}`} player={player}>
                                                <img className='remaining-player-img' src={player.headshot_src} alt="" />
                                            </NavLink>
                                        </div>
                                    ))}
                                </div>
                                <div className='remaining-players-2'>
                                    {remainingPlayers2.map((player) => (
                                        <div key={player.id} className='remaining-player'>
                                            <NavLink to={`players/${player.id}`} player={player}>
                                                <img className='remaining-player-img' src={player.headshot_src} alt="" />
                                            </NavLink>
                                        </div>

                                    ))}
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