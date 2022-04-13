import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { getAllPlayers } from "../store/player"
import { NavLink } from 'react-router-dom'
import './PlayerDetail.css'
import PostDetail from "./PostDetail"


const PlayerDetail = () => {
    const { playerId } = useParams()
    const dispatch = useDispatch()
    const player = useSelector((state) => state.players[playerId])
    const posts = player?.posts
    const reversedPosts = player?.posts.reverse()


    useEffect(() => {
        dispatch(getAllPlayers())
    }, [dispatch])


    return (
        <>
            <div className='pic-and-name'>
                <img className='profile-pic' src={player?.headshot_src} alt="" />
                <h1>{player?.first_name} {player?.last_name}</h1>
            </div>
            <div className='player-info-container'>
                <div className='player-info'>
                    <div className='overall-rating'>
                        <div className='overall-label'>Overall</div>
                        <div className='overall-num'>{player?.overall_rating}</div>
                    </div>
                    <div className='other-ratings'>
                        <div className='left-ratings'>
                            <div className='left-rating-labels'>
                                <div>Inside Scoring:</div>
                                <div>Outside Scoring:</div>
                                <div>Defense:</div>
                            </div>
                            <div>
                                <div>{player?.inside_rating}</div>
                                <div>{player?.outside_rating}</div>
                                <div>{player?.defense_rating}</div>
                            </div>
                        </div>
                        <div className='right-ratings'>
                            <div className='left-rating-labels'>
                                <div>Rebounding:</div>
                                <div>Hustle:</div>
                                <div>Passing:</div>
                            </div>
                            <div>
                                <div>{player?.rebound_rating}</div>
                                <div>{player?.hustle_rating}</div>
                                <div>{player?.passing_rating}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <h1>Posts</h1>
                <div className='posts'>
                    {posts && posts.map((post) => (
                        <div key={post.id} className='post-container'>
                            <NavLink to={`${post.player_id}/posts/${post.id}`}>
                                <img className='post-img' src={post.img_src} alt="" />
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default PlayerDetail