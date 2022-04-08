

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import { createPostComment, getAllPosts } from '../store/post'
import './PostDetail.css'

const PostDetail = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [content, setContent] = useState('')
    const { postId } = useParams()
    const post = useSelector((state) => state.posts[postId])
    const postComments = Object.values(post?.post_comments).reverse()
    const currentUser = useSelector((state) => state.session.user)


    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    const handleComment = async (e) => {
        e.preventDefault()
        const newComment = { content }

        await dispatch(createPostComment(newComment, post.id))
        await dispatch(getAllPosts())
        setContent('')
    }


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
                                <form className='comment-form' onSubmit={handleComment}>
                                    <textarea
                                        type='text'
                                        name='content'
                                        className="textarea"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        required
                                    >
                                    </textarea>
                                    <div className='btn'>
                                        <button type='submit'>Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='comment-cont'>
                    {postComments?.map((comment) => (
                        <div key={comment.id} className='poster-and-comment'>
                            <NavLink to={`/users/${comment.user_id}`} className='comment-username'>{comment.user_username}</NavLink>
                            <div className='comment-content'>
                                {comment.content}
                            {comment.user_id === currentUser.id &&
                                <div className='comment-btns'>
                                    <button>Edit</button>
                                    <button onClick={() => history.push(`/posts/${post.id}/comments/${comment.id}`)}>Delete</button>
                                </div>
                            }
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </>
    )
}

export default PostDetail