import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { PostContext } from "./PostProvider.js";
import "./Post.css";

export const MyPosts = (props) => {
  const history = useHistory();
  const { posts, getPosts } = useContext(PostContext);
  const userId = parseInt(localStorage.getItem("rareuser_pk"))

  useEffect(() => {
    getPosts()
  }, []);

  return (
    <article className="post_list">
      <header className="post_header">
        <h2>My Feed</h2>
      </header>
      {posts.map((p) => {
          if (p.user === userId) {
        return (
          <section key={p.id} id={`post--${p.id}`}>

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
