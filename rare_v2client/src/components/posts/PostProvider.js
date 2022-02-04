import React, {useState, createContext} from "react";

export const PostContext = createContext()

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([])

    const getPosts = () => {
    return fetch("http://localhost:8000/posts", {
        headers: {
            Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
        },
    })
    .then((res) => res.json())
    .then(setPosts)
}

    const addPost = newPost => {
    return fetch("http://localhost:8000/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
        },
        body: JSON.stringify(newPost)
    })
        .then(getPosts)
}

    const getPostById = (postId) => {
        return fetch(`http://localhost:8000/posts/${postId}`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(res => res.json())
    }

    const deletePost = (postId) => {
        return fetch(`http://localhost:8000/posts/${postId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(getPosts)
    }

    return (
        <PostContext.Provider value={{
            posts, getPosts, addPost, getPostById, deletePost }}>
            {props.children}
            </PostContext.Provider>
    )
}