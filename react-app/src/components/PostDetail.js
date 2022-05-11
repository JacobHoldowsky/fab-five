

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import { createPostComment, getAllPosts } from '../store/post'
import './PostDetail.css'

const PostDetail = () => {
    const dispatch = useDispatch()
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState([])
    const history = useHistory()
    const [content, setContent] = useState('')
    const { postId } = useParams()
    const post = useSelector((state) => state.posts[postId])
    const postComments = Object.values(post?.post_comments).reverse()
    const currentUser = useSelector((state) => state.session.user)


    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    const addDefaultSrc = (ev) => {
        ev.target.src = 'https://exstreamist.com/wp-content/uploads/2015/10/NBA_Logo.jpg'
    }

    const handleComment = async (e) => {
        e.preventDefault()
        setSubmitted(true)
        setErrors([])

        if (content.length > 255) {
            setErrors((errors) => [...errors, 'Comment may be no longer than 255 characters.'])
        }

        if (content.length <= 255) {
            const newComment = { content }

            await dispatch(createPostComment(newComment, post.id))
            await dispatch(getAllPosts())
            setContent('')
            setSubmitted(false)
        } else {
            setSubmitted(false)
        }
    }


    return (
        <>
            <div className='page-cont'>
                <h1 className='detail-info'>
                    <NavLink to={`/players/${post?.player_id}`}>{post?.player_first_name} {post?.player_last_name}</NavLink>
                </h1>
                <div className='img-and-caption'>
                    <div className='img-cont'>
                        <img className='img' src={post?.img_src} onError={addDefaultSrc} alt="" />
                    </div>
                    <div className='poster-info'>
                        <div id='posted-by'>Posted by:</div>
                        <NavLink to={`/users/${post?.user_id}`}>{post?.user_username}</NavLink>
                    </div>
                    <div className='caption'>
                        <div>{post?.caption}</div>
                    </div>

                    <div className='comments-poster'>
                        {post.user_id === currentUser.id && <div className='pd-edit-delete'>
                            <button onClick={() => history.push(`/posts/${post.id}/edit`)}>Edit</button>
                            <button onClick={() => history.push(`/posts/${post.id}/delete`)}>Delete</button>
                        </div>}
                        <h1 id='comments'>Comments</h1>
                        <div className='comment-box-and-btn'>
                            <div>
                                <div>
                                    {errors && errors.map((error, i) => (
                                        <div className='error' key={i}>{error}</div>
                                    ))}
                                </div>
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
                                        <button disabled={submitted} type='submit'>Submit</button>
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
                                        <button onClick={() => history.push(`/posts/${post.id}/comments/${comment.id}/edit`)}>Edit</button>
                                        <button onClick={() => history.push(`/posts/${post.id}/comments/${comment.id}/delete`)}>Delete</button>
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