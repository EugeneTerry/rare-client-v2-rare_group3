import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { CommentContext } from "./CommentProvider"
import { PostContext } from "../posts/PostProvider"
import "./CommentBox.css"

export const CommentBox = ({reloadComments}) => {
    const history = useHistory()
    const { comments, createNewComment, getCommentById, editComment } = useContext(CommentContext)
    const { getPosts } = useContext(PostContext)
    const { commentId } = useParams()
    const { postId } = useParams()
    const updateComment = commentId ? true : false
    const [isLoading, setIsLoading] = useState(true)
    const rareuser = parseInt(localStorage.getItem("rareuser_pk"))
    const post_id = parseInt(comments.post)

    const [comment, setComment] = useState({
        post: 0,
        content: "",
        created_on: Date.now()
    })

    useEffect(() => {
        getPosts().then(() => {
            if(commentId) {
                getCommentById(parseInt(commentId))
                .then(comment => {
                    setComment(comment)
                    setIsLoading(false)
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

    const handleSaveComment = () => {
        const post_id = parseInt(comment.post)
        if (updateComment) {
            editComment({
                id: comment.id,
                post: post_id,
                author: rareuser,
                content: comment.content,
                created_on: Date.now()
            }).then(() => history.push(`/comments/edit/${commentId}`))
                window.location.reload()
        } else {
            const newComment = {
                post: postId,
                author: rareuser,
                content: comment.content,
                created_on: Date.now()
            }
            createNewComment(newComment)
            .then(() => {
                window.location.reload()
            })
        }
    }

    return (
        <form className="comments">
            <input type="text" required autoFocus className="commentBox" id="content" key="content" placeholder="Write a comment..." onChange={handleControlInputChange} value={comment.content}/>
            <button className="saveComment" style={{fontSize:"10px"}} disabled={isLoading} onClick={(e) => {
                e.preventDefault();
                handleSaveComment()
            }}>
                {commentId ? <>Update</> : <>Ad</>}
            </button>
        </form>
    )
}