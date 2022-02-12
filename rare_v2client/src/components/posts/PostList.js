import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { PostContext } from "./PostProvider.js";
import "./Post.css";
import moment from "moment";

export const PostList = (props) => {
  const history = useHistory();
  const { posts, getPosts } = useContext(PostContext);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <article className="post_list">
      <header className="post_header">
        <h2>Posts</h2>
      </header>
      <button style={{display:"block", marginLeft:"auto", marginRight:"auto", marginBottom:"30px"}} onClick={() => history.push("/posts/create")}>Create Post</button>
      {posts.map((p) => {
        if (p.approved === true)
        return (
          <section className="ind_post" key={p.id} id={`post--${p.id}`}>
            Post by&nbsp;
            <Link className="post_user" to={`/profiles/$`}>
              <i>{p.user.user.first_name} {p.user.user.last_name}</i>
            </Link>
            <div className="post_publicatonDate" style={{ fontSize: "10px" }}>
              {moment(p.publication_date).format("MMMM DD YYYY, h:mm a")}
            </div>
            <div className="post_title">
              <Link to={`/posts/${p.id}`}>
              <b>{p.title}</b>
              </Link>
            </div>
            <Link to={`/posts/${p.id}`}>
              <img src={p.image_url} width="500px" height="350px" />
            </Link>
          </section>
        );
      })}
    </article>
  );
};
