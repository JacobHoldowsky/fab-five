import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router"
import { getAllPlayers } from "../store/player"
import { editPost } from "../store/post"
import './EditPostForm.css'


const EditPostForm = () => {
    const { postId } = useParams()
    const post = useSelector(state => state.posts[postId])
    const history = useHistory()
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const [caption, setCaption] = useState(post.caption)
    const [image, setImage] = useState(post.img_src)
    const [player, setPlayer] = useState(post.player_id)

    const players = useSelector((state) => Object.values(state.players))

    useEffect(() => {
        dispatch(getAllPlayers())
    }, [dispatch])

    const onSubmit = async (e) => {
        e.preventDefault()

        setErrors([])

        if (caption.length > 75) setErrors((errors) => [...errors, 'Caption must be no more than 75 characters.'])
        if (!image.includes('svg') && !image.includes('jpeg') && !image.includes('jpg') && !image.includes('png')) {
            setErrors((errors) => [...errors, 'Please enter a valid image url.'])
        }
        if (!player) setErrors((errors) => [...errors, 'Please select a player.'])


        if (caption.length <= 75 &&
            (image.includes('svg') || image.includes('jpeg') || image.includes('jpg') || image.includes('png')) &&
            player) {
            const post = {
                player: parseInt(player),
                image,
                caption
            }



            const editedPost = await dispatch(editPost(post, postId))

            setPlayer(null)
            setCaption('')
            setImage('')

            history.push(`/players/${post.player}/posts/${postId}`)
        }

    }

    return (
        <>
            <h1>Edit Post Form</h1>
            <div className='new-team-form-cont'>
                <h2>Edit your post!</h2>
                <form className='new-team-form' onSubmit={onSubmit}>
                    <div>
                        {errors.map((error, i) => (
                            <div className='error' key={i}>{error}</div>
                        ))}
                    </div>
                    <div className='form-inputs'>
                        <div className='form-div'>
                            <label htmlFor="image">Image</label>
                            <input
                                id='image'
                                type="text"
                                name='image'
                                onChange={(e) => setImage(e.target.value)}
                                value={image}
                                placeholder='Valid Image URL'
                                required
                            />
                        </div>
                        <div className='form-div'>
                            <label htmlFor="caption">Caption</label>
                            <input
                                id='caption'
                                type="text"
                                name="caption"
                                onChange={(e) => setCaption(e.target.value)}
                                value={caption}
                                placeholder='Caption'
                                required
                            />
                        </div>
                    </div>
                    <div className='player-dropdowns'>
                        <div className='form-div'>
                            <label htmlFor="player">Player</label>
                            <select
                                id='player'
                                type="text"
                                name="player"
                                onChange={(e) => setPlayer(e.target.value)}
                                defaultValue={post.player_id}
                            >
                                <option value={post.player_id} disabled hidden>{post.player_first_name} {post.player_last_name}</option>
                                {players?.map((player) => (
                                    <option key={player.id} value={player.id}>{player.first_name} {player.last_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        </>
    )
}

export default EditPostForm