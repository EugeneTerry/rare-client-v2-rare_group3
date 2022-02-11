import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { PostContext } from "../posts/PostProvider.js";
import "../posts/Post.css";

export const AdminPendingPost = (props) => {
  const history = useHistory();
  const { posts, getPosts } = useContext(PostContext);

  useEffect(() => {
    getPosts()
  }, []);

  return (
    <article className="post_list">
      <header className="post_header">
        <h2>Pending Posts</h2>
      </header>
      {posts.map((p) => {
          if (p.approved === false) {
        return (
          <section key={p.id} id={`post--${p.id}`}>
            <Link className="post_user" to={`/profile/$`}>
              {p.user?.first_name}
            </Link>
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
        )}
      })}
    </article>
  );
};
