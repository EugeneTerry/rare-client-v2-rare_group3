import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { PostContext } from "./PostProvider.js";
import { CommentContext } from "../comments/CommentProvider"
import { CommentBox } from "../comments/CommentBox"
import { MyReactions } from "../reactions/PostReaction"
import "./Post.css";

export const PostDetail = () => {
  const history = useHistory();
  const [post, setPost] = useState([]);
  const { getPostById, deletePost } = useContext(PostContext);
  const { comments, getComments, deleteComment } = useContext(CommentContext);
  const rareuser_id = parseInt(localStorage.getItem("rare_user_id"));
  const { postId } = useParams()


  useEffect(() => {
      getPostById(postId)
        .then(setPost)
}, [])

  const handleDelete = id => () => {
    deleteComment(id)
      .then(() => {
        history.push("/")
      })
  }


  return (
    <article className="post_list">
      <button onClick={() => history.push("/posts/create")}>Create Post</button>

      <header className="post_header">
        <h2>Post</h2>
      </header>
          <section className="post_detail">
            <Link className="post_user" to={`/rareusers/$`}></Link>
            <div className="post_title">
              <h4>{post.title}</h4>
            </div>
            <div className="post_publicatonDate" style={{fontSize: "10px"}}>{post.publication_date}</div>
            <img
              className="post_image"
              src={post.image_url}
              width="500px"
              height="350px"
            />
            <div className="post_content">{post.content}</div>
            <div>
              <h2 style={{fontSize: "16px"}}>Comments</h2>
              <div className="postReactions">
                <MyReactions />
              </div>
              <ul style={{background: "lightGray"}}>
                {post.comments?.map((comment) => {
                    return (
                      <div
                        className="comments"
                        key={comment.id}
                        id={`comments--${comment.id}`}
                      >
                        <div className="comment_author">
                          <b>{comment.author.first_name} {comment.author.last_name}</b>
                        </div>
                        <div className="comment_content" style={{fontSize: "14px"}}>{comment.content}</div>
                        <button onClick={handleDelete(comment.id)} hidden={comment.author.id === rareuser_id ? "" : "hidden"}>
                        <img src="https://cdn-icons-png.flaticon.com/512/3096/3096673.png"/></button>
                        <div className="comment_created_on" style={{fontSize: "8px"}}>{comment.created_on}</div>
                      </div>
                    );
                })}
              </ul>
              <div className="commentBox">
                <CommentBox />
              </div>
            </div>
          </section>
    </article>
  );
};
