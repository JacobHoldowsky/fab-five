import './DeletePostCommentConfirmationForm.css'
import { useHistory, useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { deletePostComment } from '../store/post'
import { useState } from 'react'

const DeletePostCommentConfirmationForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { postId, commentId } = useParams()
    const [submitted, setSubmitted] = useState(false)


    const handleDelete = async (e) => {
        e.preventDefault()
        setSubmitted(true)
        const comment = await dispatch(deletePostComment(commentId))
        setSubmitted(false)
        history.push(`/players/${postId}/posts/${postId}`)
        return comment
    }

    return (
        <>
            <h1>Delete Comment</h1>

            <form onSubmit={handleDelete} className='delete-pccf'>
                <div className='delete-pccf-items'>
                    <div>Are you sure you'd like to delete this comment?</div>
                    <div className='pc-cancel-delete-btns'>
                        <button onClick={() => history.push(`/players/${postId}/posts/${postId}`)}>Cancel</button>
                        <button disabled={submitted} type='submit'>Confirm</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default DeletePostCommentConfirmationForm