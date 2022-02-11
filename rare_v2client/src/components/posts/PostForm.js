import React, {useState, useEffect, useContext} from "react";
import { useParams, useHistory } from "react-router";
import { PostContext } from "./PostProvider";
import { CategoryContext } from "../categories/CategoryProvider"

export const PostForm = () => {
  const [category, setCategories] = useState([])
  const { addPost, editPost, getPostById } = useContext(PostContext)
  const { categories, getCategories } = useContext(CategoryContext)
  const {postId} = useParams()
  const history = useHistory()
  const editMode = postId ? true : false

  const [post, setPost] = useState({
    title: "",
    category: 0,
    publication_date: Date.now(),
    image_url: "",
    content: "",
    approved: true,
    user: 0
  })

	useEffect(() => {
		getCategories().then(() => {
			if(postId) {
				getPostById(parseInt(postId))
				.then(post => {
					setPost(post)
				})
			}
		})
	}, [])

  const handleInputChange = (event) => {
  //   const newPost = Object.assign({}, post)
  //   newPost[event.target.title] = event.target.value
  //   setPost(newPost)
  // }

  // useEffect(() => {
  //   if (editMode) {
  //     getPostById(postId).then((res) => {
  //       setPost(res)
  //       console.warn('postId',postId)
  //     })
  //   }
  //   getCategories().then(categoriesData => setCategories(categoriesData))
  // }, [])

  const newPost = { ...post }
  newPost[event.target.id] = event.target.value;
	setPost(newPost)
	}
  const createNewPost = () => {
    const category_id = parseInt(post.category)

      if (editMode) {
        editPost({
          id: post.id,
          title: post.title,
          category: category_id,
          publication_date: post.publication_date,
          image_url: post.image_url,
          content: post.content,
          approved: true,
          user: parseInt(localStorage.getItem("rareuser_pk"))
        })
          .then (() => history.push("/posts"))

      } else {
        addPost({
          title: post.title,
          category: category_id,
          publication_date: new Date(),
          image_url: post.image_url,
          content: post.content,
          approved: false,
          user: parseInt(localStorage.getItem("rareuser_pk"))

        })
          .then (() => history.push("/myposts"))
      }

  }

  return (
    <form className="postForm">
      <h2 className="postForm__title">{editMode ? "Edit Post" : "Add Post"}</h2>
      <fieldset>
        <div className="form_group">
          <label htmlFor="title"> Post Title: </label>
          <input type="text" title="title" required autoFocus className="form-control"
          placeholder="Post title"
          defaultValue={post.title}
          onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form_group">
          <label htmlFor="image_url"> Image URL: </label>
          <input type="text" title="image_url" required autoFocus className="form-control"
          placeholder="Image Url"
          defaultValue={post.image_url}
          onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form_group">
          <label htmlFor="content"> Content: </label>
          <input type="text" title="content" required autoFocus className="form-control"
          placeholder="Post content"
          defaultValue={post.content}
          onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form_group">
          <label htmlFor="category_id"> Category: </label>
          <select label="category_id" title="category_id" require autoFocus className="form-control" id="category" placeholder="pick"
            defaultValue={post.category}
            onChange={handleInputChange}>
              {categories.map(c => {
                    return(
                  <option key={c} value={c}>
                    {c.label}
                  </option>
                )})
              }
            </select>
        </div>
      </fieldset>
      <button type="submit"
        onClick={evt => {
          evt.preventDefault()
          createNewPost()
        }}
        className="bt btn-primary">
        {editMode ? "Save Edit" : "Create Post"}
      </button>
    </form>
  )
}