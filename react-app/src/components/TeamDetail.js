import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { NavLink } from "react-router-dom"
import { getAllFollowedTeams } from "../store/team"
import './TeamDetail.css'


const TeamDetail = () => {
    const dispatch = useDispatch()
    const { teamId } = useParams()
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(getAllFollowedTeams(user.id))
    }, [dispatch, user.id, teamId]);

    const teams = useSelector((state) => state.teams)
    const team = teams[teamId]
    console.log('teams', teams)
    console.log('team', team)

    const bestPlayer = team?.players[0]
    console.log('bestplayer', bestPlayer)
    const remainingPlayers = team?.players.slice(1)
    console.log(remainingPlayers)
    let teamOverall = 0
    let teamInside = 0
    let teamOutside = 0
    let teamDefense = 0
    let teamRebounding = 0
    let teamHustle = 0
    let teamPassing = 0

    team?.players.forEach((player) => {
        teamOverall += player.overall_rating
        teamInside += player.inside_rating
        teamOutside += player.outside_rating
        teamDefense += player.defense_rating
        teamRebounding += player.rebound_rating
        teamHustle += player.hustle_rating
        teamPassing += player.passing_rating
    })



    return (
        <div className='td-page'>
            <div>
                <h1>{team?.city} {team?.name}</h1>
            </div>
            <div className='ratings-and-bp'>
                <div className='td-best-player-cont'>
                    <NavLink to={`/players/${bestPlayer?.id}`}>
                        <img className='td-best-player-img' src={bestPlayer?.headshot_src} alt="" />
                    </NavLink>
                    <NavLink to={`/players/${bestPlayer?.id}`}>{bestPlayer?.first_name} {bestPlayer?.last_name}</NavLink>
                </div>
                <div>

                </div>
            </div>
            <div className='team-detail-rp'>
                {remainingPlayers?.map((player) => (
                    <div className='td-rp-cont' key={player.id}>
                        <NavLink to={`/players/${player.id}`}>
                            <img className='td-player-img' src={player.headshot_src} alt="" />
                        </NavLink>
                        <NavLink to={`/players/${player.id}`}>{player.first_name} {player.last_name}</NavLink>
                    </div>
                ))}
            </div>
            <div className='team-ratings'>
                <div className='player-info'>
                    <div className='overall-rating'>
                        <div className='overall-label'>Team Overall</div>
                        <div className='overall-num'>{Math.round(teamOverall / 5)}</div>
                    </div>
                    <div className='other-ratings'>
                        <div className='left-ratings'>
                            <div className='left-rating-labels'>
                                <div>Inside Scoring:</div>
                                <div>Outside Scoring:</div>
                                <div>Defense:</div>
                            </div>
                            <div>
                                <div>{Math.round(teamInside / 5)}</div>
                                <div>{Math.round(teamOutside / 5)}</div>
                                <div>{Math.round(teamDefense / 5)}</div>
                            </div>
                        </div>
                        <div className='right-ratings'>
                            <div className='left-rating-labels'>
                                <div>Rebounding:</div>
                                <div>Hustle:</div>
                                <div>Passing:</div>
                            </div>
                            <div>
                                <div>{Math.round(teamRebounding / 5)}</div>
                                <div>{Math.round(teamHustle / 5)}</div>
                                <div>{Math.round(teamPassing / 5)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamDetail