import React, { useEffect, useState, useContext } from "react";
import { PostContext } from "./PostProvider";

export const MyPosts = () => {
    const [post, setPost] = useState([])
    const [myPosts, setMyPosts] = useState([])
    const { posts, getPosts } = useContext(PostContext)

    const userId = parseInt(localStorage.getItem("rare_user_id"))

    useEffect(() => {
        getPosts()
          .then(setPost)
  }, [])

    // useEffect(() => {
    //     const myPosts = posts.filter(post => post.user_id === parseInt(userId))
    //     setMyPosts(myPosts)
    // }, [posts, userId])

    return (
        <div className='myPosts'>
            {
            posts.map(p => {
                if (p.userId === userId) {
                return (
                    <div className='myPosts_post'>
                        <h3>{p.title}</h3>
                        <img src={p.image_url} alt='post_image'/>
                        <p>Posted on {p.publication_date}</p>
                        <p>Posted by user {p.user.first_name} {p.user.last_name}</p>
                    </div>
                )
            }})
            }
        </div>
    )
}