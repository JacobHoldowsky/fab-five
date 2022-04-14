import './DeleteTeamCommentConfirmationForm.css'
import { useHistory, useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { deleteTeamComment } from '../store/team'
import { useState } from 'react'

const DeleteTeamCommentConfirmationForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { teamId, commentId } = useParams()
    const [submitted, setSubmitted] = useState(false)


    const handleDelete = async (e) => {
        e.preventDefault()
        setSubmitted(true)
        const comment = await dispatch(deleteTeamComment(commentId))
        setSubmitted(false)
        history.push(`/teams/${teamId}`)
        return comment
    }

    return (
        <>
            <h1>Delete Comment</h1>

            <form onSubmit={handleDelete} className='delete-tccf'>
                <div className='delete-tccf-items'>
                    <div>Are you sure you'd like to delete this comment?</div>
                    <div className='tc-cancel-delete-btns'>
                        <button onClick={() => history.push(`/teams/${teamId}`)}>Cancel</button>
                        <button disabled={submitted} type='submit'>Confirm</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default DeleteTeamCommentConfirmationForm