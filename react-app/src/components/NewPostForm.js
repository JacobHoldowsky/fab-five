import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { getAllPlayers } from "../store/player"
import { createPost } from "../store/post"
import './NewPostForm.css'


const NewPostForm = () => {
    
    const history = useHistory()
    const dispatch = useDispatch()
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState([])
    const [caption, setCaption] = useState('')
    const [image, setImage] = useState('')
    const [imageLoading, setImageLoading] = useState(false)
    const [player, setPlayer] = useState(null)

    const players = useSelector((state) => Object.values(state.players))


    useEffect(() => {
        dispatch(getAllPlayers())
    }, [dispatch])

    const onSubmit = async (e) => {
        e.preventDefault()
        setSubmitted(true)
        setErrors([])

        const formData = new FormData()

        if (caption.length > 75) setErrors((errors) => [...errors, 'Caption must be no more than 75 characters.'])
        // if (!image.includes('svg') && !image.includes('jpeg') && !image.includes('jpg') && !image.includes('png')) {
        //     setErrors((errors) => [...errors, 'Please enter a valid image url.'])
        // }
        if (!player) setErrors((errors) => [...errors, 'Please select a player.'])

        if (caption.length <= 75 && player ) {

            formData.append('player', parseInt(player))
            formData.append('caption', caption)
            formData.append('image', image)

            console.log('image',image)

            const newPost = await dispatch(createPost(formData))

            if (newPost) setImageLoading(false)

            setPlayer(null)
            setCaption('')
            setImage('')
            setSubmitted(false)
            history.push(`/players/${parseInt(player)}/posts/${newPost.post?.id}`)
        } else {
            setSubmitted(false)
        }

    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
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
                                type="file"
                                name='image'
                                accept='image/*'
                                onChange={updateImage}
                                // value={image}
                                // placeholder='Valid Image URL'
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
                            >
                                <option value="" disabled selected hidden>Please Choose...</option>
                                {players?.map((player) => (
                                    <option key={player.id} value={player.id}>{player.first_name} {player.last_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button disabled={submitted}>Submit</button>
                </form>
            </div>
        </>
    )
}

export default NewPostForm