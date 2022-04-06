import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { getAllFollowedTeams } from "../store/team"
import './TeamDetail.css'


const TeamDetail = () => {
    const dispatch = useDispatch()
    const teams = useSelector((state) => state.teams)
    const { teamId } = useParams()
    const user = useSelector((state) => state.session.user)
    const team = teams[teamId]
    console.log('teams', teams)
    console.log('team', team)

    const bestPlayer = team?.players[0]
    console.log('bestplayer', bestPlayer)
    const remainingPlayers = team?.players.slice(1)
    const remainingPlayers1 = team?.players.slice(1, 3)
    const remainingPlayers2 = team?.players.slice(3)
    console.log(remainingPlayers)

    useEffect(() => {
        dispatch(getAllFollowedTeams(user.id))
    }, [dispatch, user.id, teamId]);

    return (
        <div className='team-detail-page'>
            <div>
                <img className='best-player-team-detail-img' src={bestPlayer?.headshot_src} alt="" />
            </div>
            <div>
                {remainingPlayers1?.map((player) => (
                    <div key={player.id}>
                        <img className='player-img' src={player.headshot_src} alt="" />
                    </div>
                ))}
            </div>
            <div>
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