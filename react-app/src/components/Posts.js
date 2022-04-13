import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../store/post'
import { NavLink } from 'react-router-dom'
import './Posts.css'

const Posts = () => {
    const dispatch = useDispatch()
    const posts = useSelector((state) => Object.values(state.posts).reverse())

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    return (
        <div className='splash'>
            <h1>Fab Five</h1>
            <h2>The place to see your favorite players and make the team of your dreams</h2>
            <div className='user-content-posts'>
                <div className='posts'>
                    {posts && posts?.map((post) => (
                        <div key={post.id} className='post-container'>
                            <NavLink to={`/players/${post.player_id}/posts/${post.id}`}>
                                <img className='post-img' src={post.img_src} alt="" />
                            </NavLink>
                            <div className='post-info'>
                                <NavLink to={`/players/${post.player_id}`}>
                                    {post.player_first_name} {post.player_last_name}
                                </NavLink>
                                <div className='seperator'>|</div>
                                <NavLink to={`/users/${post.user_id}`}>
                                    {post.user_username}
                                </NavLink>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Posts