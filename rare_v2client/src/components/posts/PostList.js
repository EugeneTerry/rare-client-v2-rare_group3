import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import  {PostContext} from "./PostProvider.js"

export const PostList = (props) => {
  const [ post, setPost] = useState([])
  const history = useHistory()
  const { posts, getPosts } = useContext(PostContext)

  useEffect(() => {
    getPosts().then(postsData => setPost(postsData))
  }, [])

  return(
    <article className="posts">
      <header className="post_header">
        <h3>Posts</h3>
      </header>
        {posts.map((p) => {
            return (
            <section key={p.id} id={`post--${p.id}`}>
                <div className="post_title">
                  <h4>{p.title}</h4>
                </div>
            </section>
            )
        })}
    </article>
  )}
