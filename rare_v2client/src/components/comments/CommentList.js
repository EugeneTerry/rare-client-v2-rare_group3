import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import  { CommentContext } from "./CommentProvider";
import { PostContext } from "../posts/PostProvider"

export const CommentList = (props) => {
	const history = useHistory()
  const [ comment, setComment ] = useState([])
  const { comments, getComments } = useContext(CommentContext)
	const [ showComment, setShowComment ] = useState(false)
	const { posts } = useContext(PostContext)


  useEffect(() => {
    getComments().then((data)=> setComment((data)))
  }, [])

  // useEffect(() => {
  //   const relatedComments = comments.filter(comment => comment.post_id === postId )
  //   setTheComments(relatedComments)
  // },[comments, postId])


  return(
    <div>
      <h2>Comments</h2>
      <ul>
			{comments.map((c) => {
				if (c.post.id === posts.id) {
					return (
						<div className="comments" key={c.post} id={`comments--${c.post}`}>
							<div className="comment_author" value={c.author}>
								{c.author.name}
							</div>
							<div className="comment_content">
								{c.content}
							</div>
							<div className="comment_created_on">
								{c.created_on}
							</div>
						</div>
					)
				}})}
</ul>
</div>
)}