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
        <>
            <div>
                {teams?.map((team) => {
                    let bestPlayer = {}
                    let bestOverallRating = 0
                    for (let i = 0; i < team.players.length; i++) {
                        let player = team.players[0]
                        if (player.overall_rating > bestOverallRating) {
                            bestOverallRating = player.overall_rating
                            bestPlayer = player
                        }
                    }
                    let remainingPlayers = team.players.splice(team.players.indexOf(bestPlayer), 1)
                    console.log('BEST', bestPlayer)
                    console.log('REMAINING',remainingPlayers)
                    return <>
                                <div>
                                    <img src={bestPlayer.headshot_src} alt="" />
                                </div>
                                <div>
                                    {remainingPlayers.map((player) => (
                                        <img src={player.headshot_src} alt="" />
                                    ))}
                                </div>
                           </>

                })}
            </div>
            {/* <div>
                {teams?.map((team) => (
                    team.players.map((player) => (
                        <img src={player.headshot_src} alt="" />
                    ))
                ))}
            </div> */}
        </>
    )
}

export default Teams