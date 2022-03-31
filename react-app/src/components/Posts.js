import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../store/post'

const Posts = () => {
    const dispatch = useDispatch()
    const posts = useSelector((state) => Object.values(state.posts))
    console.log('posts',posts)

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    return (
        <>
        <h1>Posts</h1>
        {posts?.map((post) => (
            <div key={post.id}>
                <img src={post.img_src} alt="" />
            </div>
        ))}
        </>
    )
}

export default Posts