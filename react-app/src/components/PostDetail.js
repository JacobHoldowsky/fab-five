

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import { getAllPosts } from '../store/post'
import './PostDetail.css'

const PostDetail = () => {
    const dispatch = useDispatch()
    const { postId } = useParams()
    const post = useSelector((state) => state.posts[postId])
    console.log('post', post)

    useEffect(() => (
        dispatch(getAllPosts())
    ), [dispatch])
    return (
        <>
            <div className='page-cont'>
                <div className='detail-info'>
                    <NavLink to={`/players/${post?.player_id}`}>{post?.player_first_name} {post?.player_last_name}</NavLink>
                    <div> | </div>
                    <div>{post?.user_username}</div>
                </div>
                <div className='img-cont'>
                    <img className='img' src={post?.img_src} alt="" />
                </div>
            </div>
        </>
    )
}

export default PostDetail