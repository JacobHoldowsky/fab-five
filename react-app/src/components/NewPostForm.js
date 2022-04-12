import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { getAllPlayers } from "../store/player"
import { createPost } from "../store/post"
import './NewPostForm.css'


const NewPostForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const [caption, setCaption] = useState('')
    const [image, setImage] = useState('')
    const [player, setPlayer] = useState(null)

    const players = useSelector((state) => Object.values(state.players))
    console.log('PLAYERS',players)

    useEffect(() => {
        dispatch(getAllPlayers())
    }, [dispatch])

    const onSubmit = async (e) => {
        e.preventDefault()

        setErrors([])

        const post = {
            player: parseInt(player),
            image,
            caption
        }



        const newPost = await dispatch(createPost(post))

        setPlayer(null)
        setCaption('')
        setImage('')

        console.log('POST',post)
        console.log('NEWPOST',newPost)

        history.push(`/players/${post.player}/posts/${newPost.post?.id}`)
    }

    return (
        <>
            <h1>New Post Form</h1>
            <div className='new-team-form-cont'>
                <h2>Make a new post!</h2>
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
                            >
                                <option value="" disabled selected hidden>Please Choose...</option>
                                {players?.map((player) => (
                                    <option value={player.id}>{player.first_name} {player.last_name}</option>
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

export default NewPostForm