import React, {useState, createContext} from "react";

export const CommentContext = createContext()

export const CommentProvider = (props) => {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState({})

    const getComments = () => {
    return fetch("http://localhost:8000/comments", {
        headers: {
            Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
        },
    })
    .then((res) => res.json())
    .then(setComments)
}

    const getCommentById = (id) => {
    return fetch(`http://localhost:8000/comments/${id}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
        }
    })
    .then(res => res.json())
    .then(setComment)
}

    const createNewComment = comment => {
    return fetch("http://localhost:8000/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
        },
        body: JSON.stringify(comment)
    })
        .then(getComments)
}

    const editComment = (comment) => {
    return fetch(`http://localhost:8000/comments/${comment.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    })
}

    const deleteComment = (comment_id) => {
    return fetch(`http://localhost:8000/comments/${comment_id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
        }
    })
        .then(getComments)
}

    return (
        <CommentContext.Provider value={{
            comments, getComments, getCommentById, createNewComment, editComment, deleteComment }}>
            {props.children}
            </CommentContext.Provider>
    )
}