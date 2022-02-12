import React, { useEffect, useState, useContext, Component } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { PostContext } from "../posts/PostProvider.js";
import "../posts/Post.css";

export const AdminPendingPost = (props) => {
  const history = useHistory();
  const { posts, getPosts, getPostById, updatePost, deletePost } = useContext(PostContext);
  const {postId} = useParams()
  const approved = postId ? true : false

  const [post, setPost] = useState({
    approved: 0
  })

	useEffect(() => {
		getPosts().then(() => {
			if(postId) {
				getPostById(parseInt(postId))
				.then(post => {
					setPost(post)
				})
			}
		})
	}, [])

  return (
    <article className="post_list">
      <header className="post_header">
        <h2>Pending Posts</h2>
      </header>
      {posts.map((p) => {
          if (p.approved === false) {
        return (
          <section className="ind_post" key={p.id} id={`post--${p.id}`}>
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
            <button value="category" onChange="">
            Approve
            </button>
          </section>
        )}
      })}
    </article>
  );
};
