import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { CommentContext } from "../comments/CommentProvider"
import { CommentBox } from "../comments/CommentBox"
import { MyReactions } from "../reactions/PostReaction"
import "./CommentBox.css";
import moment from "moment";

export const CommentList = () => {
  const history = useHistory();
  const { comments, getComments, deleteComment, getCommentById, editComment, createNewComment } = useContext(CommentContext);
  const rareuser = parseInt(localStorage.getItem("rareuser_pk"));
  const { commentId } = useParams()
  const { postId } = useParams()
  const updateComment = commentId ? true: false

  const [comment, setComment] = useState({
    post: 0,
    author: parseInt(localStorage.getItem("rareuser_pk")),
    content: "",
    created_on: Date.now()
  });

  useEffect(() => {
      getComments().then(() => {
          if(commentId) {
              getCommentById(parseInt(commentId))
              .then(comment => {
                setComment(comment)
              })
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
          content: "",
          created_on: Date.now()
      }).then(() => history.push(`/posts/${postId}`))
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

  const handleDelete = id => () => {
    deleteComment(id)
      .then(() => {
        history.push(`/posts/${postId}`)
      })
      window.location.reload()
  }

  return (
    <section className="CommentList">
      <ul style={{background: "lightGray"}}>
                {comments.map((c) => {
                  return (
                      <div
                        className="comments"
                        key={c.id}
                        id={`comments--${c.id}`}
                      style={{fontSize: "10px"}}>
                      Comment by&nbsp;
                        <Link className="comment_author" style={{fontSize:"10px"}} to={`/profile/$`}>
                        {c.author?.user.first_name} {c.author?.user.last_name}
                        </Link>
                        <div className="comment_content" style={{fontSize: "14px"}}>{c.content}</div>
                        <div className="comment_created_on" style={{fontSize: "8px"}}>{moment(c.created_on).format("MMMM DD YYYY, h:mm a")}</div>
                        <button onClick={handleDelete(c.id)} hidden={c.author.id === rareuser ? "" : "hidden"} style={{fontSize:"8px"}}>
                        remove</button>
                      </div>
                )})}
              </ul>
              <form className="comments">
            <input type="textarea" required autoFocus className="commentBox" id="content" placeholder="Write a comment..." onChange={handleControlInputChange} value={comment.content}/>
            <button className="saveComment" style={{fontSize:"10px"}} d onClick={(e) => {
                e.preventDefault();
                handleSaveComment()
            }}>
                Add
            </button>
        </form>
              </section>

              )
              }