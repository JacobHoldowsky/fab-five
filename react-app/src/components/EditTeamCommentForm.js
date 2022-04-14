import './EditTeamCommentForm.css'
import { useHistory, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { editTeamComment, getAllFollowedTeams } from '../store/team'
import { useState } from 'react'
import { useEffect } from 'react'

const EditTeamCommentConfirmationForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { commentId, teamId } = useParams()
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState([])
    const oldComment = useSelector(state => state.teams[teamId].team_comments[commentId])
    const [content, setContent] = useState(oldComment.content)

    useEffect(() => {
        dispatch(getAllFollowedTeams())
    }, [dispatch])



    const handleEdit = async (e) => {
        e.preventDefault()
        setSubmitted(true)
        setErrors([])

        if (content.length > 255) {
            setErrors((errors) => [...errors, 'Comment may be no longer than 255 characters.'])
        }

        if (content.length <= 255) {

            const newComment = {
                commentId,
                content
            }
            const comment = await dispatch(editTeamComment(newComment))
            setSubmitted(false)
            history.push(`/teams/${teamId}`)
            return comment
        } else {
            setSubmitted(false)
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
                    <button disabled={submitted} type='submit'>Submit</button>
                </div> 
            </form>
        </>
    )
}

export default EditTeamCommentConfirmationForm