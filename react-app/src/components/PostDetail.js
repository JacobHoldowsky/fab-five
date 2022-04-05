

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import { getAllPosts } from '../store/post'
import './PostDetail.css'

const PostDetail = () => {
    const dispatch = useDispatch()
    const [content, setContent] = useState()
    const { postId } = useParams()
    const post = useSelector((state) => state.posts[postId])
    const postComments = post?.post_comments

    const handleComment = async () => {
        const response = await fetch(`/api/post_comments/${post?.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(content)
        });

        if (response.ok) {
            const data = await response.json()
            return data
        } else {
            return ['An error occurred. Please try again.']
        }
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
                                <textarea className="textarea" value={content} onChange={() => setContent(content)} cols="30" rows="10"></textarea>
                            </div>
                            <div>
                                <button className='btn' onClick={handleComment}>Submit</button>
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