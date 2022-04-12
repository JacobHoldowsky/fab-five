import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../store/post'
import './Posts.css'

const Posts = () => {
    const dispatch = useDispatch()
    const posts = useSelector((state) => Object.values(state.posts).reverse())

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    return (
        <div className='post-page-container'>
            {posts?.map((post) => (
                <div className='post-container' key={post.id}>
                    <img className='post-image' src={post.img_src} alt="" />
                </div>
            ))}
        </div>

    )
}

export default Posts