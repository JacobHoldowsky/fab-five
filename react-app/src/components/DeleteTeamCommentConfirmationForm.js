import './DeleteTeamCommentConfirmationForm.css'
import { useHistory, useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { deleteTeamComment } from '../store/team'

const DeleteTeamCommentConfirmationForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { teamId, commentId } = useParams()


    const handleDelete = async (e) => {
        e.preventDefault()
        const comment = await dispatch(deleteTeamComment(commentId))
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
                        <button type='submit'>Confirm</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default DeleteTeamCommentConfirmationForm