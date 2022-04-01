import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFollowedTeams } from "../store/team";
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
                const remainingPlayers1 = remainingPlayers.slice(0,2)
                const remainingPlayers2 = remainingPlayers.slice(2)
                return (
                    <div className='team'>
                        <div className='team-header'>
                            <img className='team-logo' src={team.logo_src} alt="" />
                            <div className='team-info'>
                                <h3>{team.user_username}</h3>
                                <h3>{team.city} {team.name}</h3>
                            </div>
                        </div>
                        <div className='best-player'>
                            <img className='best-player-img' src={bestPlayer.headshot_src} alt="" />
                        </div>
                        <div className='remaining-players'>
                            <div className='remaining-players-1'>
                                {remainingPlayers1.map((player) => {
                                    return <>
                                        <div className='remaining-player'>
                                            <img className='remaining-player-img' src={player.headshot_src} alt="" />
                                        </div>
                                    </>
                                })}
                            </div>
                            <div className='remaining-players-2'>
                                {remainingPlayers2.map((player) => {
                                    return <>
                                        <div className='remaining-player'>
                                            <img className='remaining-player-img' src={player.headshot_src} alt="" />
                                        </div>
                                    </>
                                })}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Teams