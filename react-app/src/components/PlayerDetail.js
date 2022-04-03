import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { getAllPlayers } from "../store/player"
import './PlayerDetail.css'


const PlayerDetail = () => {
    const { playerId } = useParams()
    const dispatch = useDispatch()
    const player = useSelector((state) => state.players[playerId])

    useEffect(() => {
        dispatch(getAllPlayers())
    }, [dispatch])


    return (
        <>
            <div className='pic-and-name'>
                <img className='pic' src={player?.headshot_src} alt="" />
                <h1>{player?.first_name} {player?.last_name}</h1>
            </div>

            <div className='player-info'>
                <div className='rating-labels'>
                    <div>Overall Rating</div>
                    <div>Inside Scoring:</div>
                    <div>Outside Scoring:</div>
                    <div>Defense:</div>
                    <div>Rebounding:</div>
                    <div>Hustle Rating:</div>
                    <div>Passing:</div>
                </div>
                <div className='rating-nums'>
                    <div>{player?.inside_rating}</div>
                    <div>{player?.overall_rating}</div>
                    <div>{player?.outside_rating}</div>
                    <div>{player?.defense_rating}</div>
                    <div>{player?.rebound_rating}</div>
                    <div>{player?.hustle_rating}</div>
                    <div>{player?.passing_rating}</div>
                </div>
            </div>
        </>
    )
}

export default PlayerDetail