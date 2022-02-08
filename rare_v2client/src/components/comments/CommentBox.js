import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { CommentContext } from "./CommentProvider"
import { PostContext } from "../posts/PostProvider"

export const CommentBox = () => {
    const history = useHistory()
    const { getComments, createNewComment, getCommentById, editComment } = useContext(CommentContext)
    const { getPosts } = useContext(PostContext)
    const { commentId } = useParams()
    const updateComment = commentId ? true : false
    const [isLoading, setIsLoading] = useState(true)
    const rareuser = parseInt(localStorage.getItem("rare_user_id"))

    const [comment, setComment] = useState({
        post: 0,
        author: rareuser,
        content: "",
        created_on: Date.now()
    })

    useEffect(() => {
        getPosts().then(() => {
            if(commentId) {
                getCommentById(parseInt(commentId))
                .then(comment => {
                    setComment(comment)
                })
            } else {
                setIsLoading(false)
            }
        })
    }, [])

    const handleControlInputChange = (e) => {
        const newComment = {...comment}
        newComment[e.target.id] = e.target.value
        setComment(newComment)
    }

    const handleSaveComment = (e) => {
        const postId = parseInt(comment.post)
        if (commentId) {
            editComment({
                id: comment.id,
                post: postId,
                author: rareuser,
                content: comment.content,
                created_on: Date.now()
            }).then(() => history.push(`/posts/${postId}`))
        } else {
            const newComment = {
                post: postId,
                author: rareuser,
                content: comment.content,
                created_on: Date.now()
            }
            createNewComment(newComment)
            .then(() => {
                history.push(`/posts/${postId}`)
            })
        }
    }

    return (
        <form className="comments">
            <input className="comment_content" placeholder="Write a comment..." onChange={handleControlInputChange} value={comment.content} />
            <button className="saveComment" disabled={isLoading} onClick={(e) => {
                e.preventDefault();
                handleSaveComment()
            }}>
                {commentId ? <>Update</> : <>Add</>}
            </button>
        </form>
    )
}