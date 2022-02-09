import React, { useEffect, useState, useContext } from "react";
import { ReactionContext } from "./ReactionProvider";
import { PostContext } from "../posts/PostProvider";
import { Link } from "react-router-dom"
import "./reaction.css"

// This is getting the reactions associated with a post and showing the reactions on the post detail page under the post

export const MyReactions = () => {
    const [myReactions, setReactions] = useState([])
    const { getReactions, reactions } = useContext(ReactionContext)
    const { getPosts } = useContext(PostContext)

    const userId = localStorage.getItem('rare_user_id')

     // State to store count value
    const [count, setCount] = useState(0);
     // Function to increment count by 1
    const incrementCount = () => {
    // Update state with incremented value
    setCount(count + 1);
    };

    useEffect(() => {
        getReactions().then((data) => setReactions(data))
    }, [])

    return (
        <div className='myReactions'>
            {
            reactions.map(reaction => {
                return (
                    <ul>
                    <button className='myReactions_post'onClick={incrementCount}>
                        {reaction.image_url} <div>{count}</div>
                    </button>
                    </ul>
                )
            })
            }
        </div>
    )
}
