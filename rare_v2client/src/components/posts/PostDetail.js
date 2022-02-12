import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { PostContext } from "./PostProvider.js";
import { CommentContext } from "../comments/CommentProvider";
import { CommentBox } from "../comments/CommentBox";
import { MyReactions } from "../reactions/PostReaction";
import "./Post.css";
import moment from "moment";

export const PostDetail = () => {
  const history = useHistory();
  const [post, setPost] = useState([]);
  const { getPostById, deletePost } = useContext(PostContext);
  const { deleteComment } = useContext(CommentContext);
  const rareuser_id = parseInt(localStorage.getItem("rareuser_pk"));
  const { postId } = useParams();
  const { commentId } = useParams();

  const reloadComments = () => {
    window.location.reload();
  };

  useEffect(() => {
    getPostById(postId).then(setPost);
  }, []);

  const handleDelete = (id) => () => {
    deleteComment(id).then(() => {
      history.push(`/posts/${postId}`);
    });
    window.location.reload();
  };

  return (
    <article className="post_list">
      <button onClick={() => history.push("/posts/create")}>Create Post</button>

      <header className="post_header">
        <h2>Post</h2>
      </header>
          <section className="post_detail">
            <Link className="post_user" to={`/rareusers/$`}></Link>
            <div className="post_title">
              <h4>{(post.title)}</h4>
            </div>
            <div className="post_publicatonDate" style={{fontSize: "10px"}}>{moment(post.publication_date).format("MMMM DD YYYY, h:mm a")}</div>
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
                <MyReactions postReactions = {post.post_reactions} />
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
                        <div className="comment_created_on" style={{fontSize: "8px"}}>{moment(comment.created_on).format("MMMM DD YYYY, h:mm a")}</div>
                        <button onClick={handleDelete(comment.id)} hidden={comment.author.id === rareuser_id ? "" : "hidden"}>
                        remove</button>
                      </div>
                    );
                })}
              </ul>
              <div className="commentBox">
                <CommentBox reloadComments={reloadComments}/>
              </div>
            </div>
          </section>
      <Link className="post_header" style={{ textDecoration: "none" }} to={`/`}>
        <h2>&#128281;</h2>
      </Link>
      <button
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "30px",
        }}
        onClick={() => history.push("/posts/create")}
      >
        Create Post
      </button>
      <section className="ind_post">
        Post by&nbsp;
        <Link className="post_user" to={`/profile/$`}>
          <i>
            {post.user?.user.first_name} {post.user?.user.last_name}
          </i>
        </Link>
        <div className="post_publicatonDate" style={{ fontSize: "10px" }}>
          {moment(post.publication_date).format("MMMM DD YYYY, h:mm a")}
        </div>
        <div className="post_title">
          <b>{post.title}</b>
        </div>
        <img
          className="post_image"
          src={post.image_url}
          width="500px"
          height="350px"
        />
        <div className="post_content">{post.content}</div>
        <div>
          <h2 style={{ fontSize: "16px" }}>Comments</h2>
          <div className="postReactions">
            <MyReactions />
          </div>
          <ul style={{ background: "lightGray" }}>
            {post.comments?.map((comment) => {
              return (
                <div
                  className="comments"
                  key={comment.id}
                  id={`comments--${comment.id}`}
                  style={{ fontSize: "10px" }}
                >
                  Comment by&nbsp;
                  <Link
                    className="comment_author"
                    style={{ fontSize: "10px" }}
                    to={`/profile/$`}
                  >
                    {comment.author?.user.first_name}{" "}
                    {comment.author?.user.last_name}
                  </Link>
                  <div className="comment_content" style={{ fontSize: "14px" }}>
                    {comment.content}
                  </div>
                  <div
                    className="comment_created_on"
                    style={{ fontSize: "8px" }}
                  >
                    {moment(comment.created_on).format("MMMM DD YYYY, h:mm a")}
                  </div>
                  <button
                    onClick={handleDelete(comment.id)}
                    hidden={comment.author.id === rareuser_id ? "" : "hidden"}
                    style={{ fontSize: "8px" }}
                  >
                    remove
                  </button>
                </div>
              );
            })}
          </ul>
          <div className="commentBox">
            <CommentBox reloadComments={reloadComments} />
          </div>
        </div>
      </section>

    </article>
  );
};
