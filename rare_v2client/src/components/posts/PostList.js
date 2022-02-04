import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { PostContext } from "./PostProvider.js";
import { CommentContext } from "../comments/CommentProvider";
import "./Post.css";

export const PostList = (props) => {
  const history = useHistory();
  const [post, setPost] = useState([]);
  const { posts, getPosts } = useContext(PostContext);
  const [comment, setComment] = useState([]);
  const { comments, getComments, deleteComment } = useContext(CommentContext);
  const rareuser_id = parseInt(localStorage.getItem("rare_user_id"));
  const { postId } = useParams()

  useEffect(() => {
    getPosts().then((postsData) => setPost(postsData));
  }, []);

  return (
    <article className="post_list">
      <button onClick={() => history.push("/posts/create")}>Create Post</button>

      <header className="post_header">
        <h2>Posts</h2>
      </header>
      {posts.map((p) => {
        return (
          <section key={p.id} id={`post--${p.id}`}>
            <Link className="post_user" to={`/rareusers/$`}></Link>
            <div className="post_title">
              <Link to={`/posts/${p.id}`}>
              {p.title}
              </Link>
            </div>
            <div className="post_publicatonDate" style={{fontSize: "10px"}}>{p.publication_date}</div>
            <Link to={`/posts/${p.id}`}>
            <img src={p.image_url}
            width="500px"
            height="350px"
            />
            </Link>
          </section>
        );
      })}
    </article>
  );
};
