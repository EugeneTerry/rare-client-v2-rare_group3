import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { PostContext } from "./PostProvider.js";
import moment from "moment"
import "./Post.css";

export const MyPosts = (props) => {
  const history = useHistory();
  const { posts, getPosts, updatePost, deletePost } = useContext(PostContext);
  const userId = parseInt(localStorage.getItem("rareuser_pk"))

  useEffect(() => {
    getPosts()
  }, []);

  const handleRelease = id => () => {
    deletePost(id)
    .then(() => {
      window.location.reload()
    })
  }

  return (
    <article className="post_list">
      <header className="post_header">
        <h2>My Feed</h2>
      </header>
      {posts.map((p) => {
          if (p.user.id === userId) {
        return (
          <section className="ind_post" key={p.id} id={`post--${p.id}`}>
          <div className="post_title">
            <b>{p.title}</b>
          </div>
          Post by&nbsp;
            <Link className="post_user" to={`/profile/$`}>
              {p.user?.user.first_name} {p.user?.user.last_name}
            </Link>
            <div className="post_publicatonDate" style={{fontSize: "10px"}}>{moment(p.publication_date).format("MMMM DD YYYY, h:mm a")}</div>
            <Link to={`/posts/${p.id}`}>
            <img src={p.image_url}
            width="500px"
            height="350px"
            />
            </Link>
            <button
                  className="edit_post" style={{fontSize:"10px"}}
                  onClick={() => {
                    history.push(`/posts/edit/${p.id}`);
                  }}
                  hidden={p.user.id === userId ? "" : "hidden"}
                >
                  Edit Post
                </button>
                &nbsp;
              <button className="delete_post" style={{fontSize:"10px"}} onClick={handleRelease(p.id)} hidden={p.user.id === userId ? "" : "hidden"}>
                Delete Post
              </button>
          </section>
        )}
      })}
    </article>
  );
};
