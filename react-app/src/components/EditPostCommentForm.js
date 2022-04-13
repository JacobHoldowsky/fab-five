import './EditPostCommentForm.css'
import { useHistory, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { editPostComment } from '../store/post'
import { useState } from 'react'

const EditTeamCommentConfirmationForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { commentId, postId, playerId } = useParams()
    const [errors, setErrors] = useState([])
    const oldComment = useSelector(state => state.posts[postId].post_comments[commentId])
    const [content, setContent] = useState(oldComment.content)



    const handleEdit = async (e) => {
        e.preventDefault()
        setErrors([])

        if (content.length > 255) {
            setErrors((errors) => [...errors, 'Comment may be no longer than 255 characters.'])
        }

        if (content.length <= 255) {
            const newComment = {
                commentId,
                content
            }
            const comment = await dispatch(editPostComment(newComment))
            history.push(`/players/${playerId}/posts/${postId}`)
            return comment
        }
    }

    return (
        <>
            <h1>Edit Comment</h1>

            <form className='td-form' onSubmit={handleEdit}>
                <div>
                    {errors && errors.map((error, i) => (
                        <div className='error' key={i}>{error}</div>
                    ))}
                </div>
                <textarea
                    type='text'
                    name="content"
                    className='textarea'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    cols="30"
                    rows="8"
                >
                </textarea>
                <div className='btn'>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </>
    )
}

export default EditTeamCommentConfirmationForm