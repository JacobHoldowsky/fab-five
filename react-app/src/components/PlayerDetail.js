import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { getAllPlayers } from "../store/player"


const PlayerDetail = () => {
    const { playerId } = useParams()
    const dispatch = useDispatch()
    const player = useSelector((state) => state.players[playerId])
    console.log(playerId)
    console.log('PLAYER', player)

    useEffect(() => {
        dispatch(getAllPlayers())
    }, [dispatch])


    return (
        <h1>{player?.first_name} {player?.last_name}</h1>

    )
}

export default PlayerDetail