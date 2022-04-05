

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import { createComment, getAllPosts } from '../store/post'
import './PostDetail.css'

const PostDetail = () => {
    const dispatch = useDispatch()
    const [content, setContent] = useState('')
    const { postId } = useParams()
    const post = useSelector((state) => state.posts[postId])
    console.log('POST', post)
    const postComments = post?.post_comments



    const handleComment = async (e) => {
        e.preventDefault()
        const newComment = { content }
        await dispatch(createComment(newComment, post.id))
        await dispatch(getAllPosts())
        setContent('')
    }

    useEffect(() => (
        dispatch(getAllPosts())
    ), [dispatch])

    return (
        <>
            <div className='page-cont'>
                <h1 className='detail-info'>
                    <NavLink to={`/players/${post?.player_id}`}>{post?.player_first_name} {post?.player_last_name}</NavLink>
                </h1>
                <div className='img-and-caption'>
                    <div className='img-cont'>
                        <img className='img' src={post?.img_src} alt="" />
                    </div>
                    <div className='poster-info'>
                        <div>Posted by:</div>
                        <NavLink to={`/users/${post?.user_id}`}>{post?.user_username}</NavLink>
                    </div>
                    <div className='comments-poster'>
                        <h2>Comments</h2>
                        <div className='comment-box-and-btn'>
                            <div>
                                <form onSubmit={handleComment}>
                                    <textarea
                                        type='text'
                                        name='content'
                                        className="textarea"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        required
                                    >
                                    </textarea>
                                    <button className='btn' type='submit'>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='comment-cont'>
                        {postComments?.map((comment) => (
                            <div className='poster-and-comment'>
                                <NavLink to={`/users/${comment.user_id}`} className='comment-username'>{comment.user_username}</NavLink>
                                <div className='comment-content'>
                                    {comment.content}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>


        </>
    )
}

export default PostDetail