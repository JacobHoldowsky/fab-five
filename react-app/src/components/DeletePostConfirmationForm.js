import './DeletePostCommentConfirmationForm.css'
import { useHistory, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost } from '../store/post'

const DeletePostConfirmationForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { postId } = useParams()
    const currentUser = useSelector(state => state.session.user)

    console.log('postId', postId)

    const handleDelete = async (e) => {
        e.preventDefault()
        const post = await dispatch(deletePost(postId))
        history.push(`/users/${currentUser}`)
        return post
    }

    return (
        <>
            <h1>Delete Post</h1>

            <form onSubmit={handleDelete} className='delete-pccf'>
                <div className='delete-pccf-items'>
                    <div>Are you sure you'd like to delete this post?</div>
                    <div className='pc-cancel-delete-btns'>
                        <button onClick={() => history.push(`/players/${postId}/posts/${postId}`)}>Cancel</button>
                        <button type='submit'>Confirm</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default DeletePostConfirmationForm