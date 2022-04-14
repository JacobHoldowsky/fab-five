import './DeleteTeamCommentConfirmationForm.css'
import { useHistory, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTeam } from '../store/team'
import { useState } from 'react'

const DeleteTeamCommentConfirmationForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { teamId } = useParams()
    const currentUser = useSelector(state => state.session.user)
    const [submitted, setSubmitted] = useState(false)

    const handleDelete = async (e) => {
        e.preventDefault()
        setSubmitted(true)
        const comment = await dispatch(deleteTeam(teamId))
        setSubmitted(false)
        history.push(`/users/${currentUser.id}`)
        return comment
    }

    return (
        <>
            <h1>Delete Comment</h1>

            <form onSubmit={handleDelete} className='delete-pccf'>
                <div className='delete-pccf-items'>
                    <div>Are you sure you'd like to delete this team?</div>
                    <div className='pc-cancel-delete-btns'>
                        <button onClick={() => history.push(`/teams/${teamId}`)}>Cancel</button>
                        <button disabled={submitted} type='submit'>Confirm</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default DeleteTeamCommentConfirmationForm