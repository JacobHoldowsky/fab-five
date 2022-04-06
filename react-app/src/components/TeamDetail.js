import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
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
    const remainingPlayers1 = team?.players.slice(1, 3)
    const remainingPlayers2 = team?.players.slice(3)
    console.log(remainingPlayers)

    return (
        <div className='team-detail-page'>
            <div>
                <h1>{team?.city} {team?.name}</h1>
            </div>
            <div>
                <img className='best-player-team-detail-img' src={bestPlayer?.headshot_src} alt="" />
            </div>
            <div className='team-detail-rp'>
                {remainingPlayers1?.map((player) => (
                    <div key={player.id}>
                        <img className='player-img' src={player.headshot_src} alt="" />
                    </div>
                ))}
            </div>
            <div className='team-detail-rp'>
                {remainingPlayers2?.map((player) => (
                    <div key={player.id}>
                        <img className='player-img' src={player.headshot_src} alt="" />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default TeamDetail