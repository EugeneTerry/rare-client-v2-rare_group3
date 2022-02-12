import React, { useEffect, useState, useContext } from "react";
import { ReactionContext } from "./ReactionProvider";
import { PostContext } from "../posts/PostProvider";
import { Link } from "react-router-dom"
import "./reaction.css"

// This is getting the reactions associated with a post and showing the reactions on the post detail page under the post

export const MyReactions = ({postReactions = []}) => { 
    // const [myReactions] = useState([])
    const { setReaction, getReactions, reactions, reaction } = useContext(ReactionContext)
    const { getPosts } = useContext(PostContext)

    const userId = localStorage.getItem('rare_user_id')

    const handleInputChange = (event) => {
        const newReaction = Object.assign({}, reaction)
        newReaction[event.target.title] = event.target.value
        setReaction(newReaction)
      }
    

     // State to store count value
    const [count, setCount] = useState(0);
     // Function to increment count by 1
    // const incrementCount = () => {
    // // Update state with incremented value
    // setCount(count + 1);
    // };

    useEffect(() => {
        getReactions()
    }, [])

    return (
        <div className='myReactions'>
            {
            reactions.map(reaction => {
                const reactionCount = postReactions.filter(postReaction => {
                    return postReaction.reaction === reaction.id
                }).length
                
                return (
                    <ul>
                    <button className='myReactions_post'onChange={handleInputChange} >
                        {reaction.image_url} <div>{reactionCount}</div>
                    </button>
                    </ul>
                )
            })
            }
        </div>
    )}
