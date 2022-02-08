import React, { useEffect, useState, useContext } from "react";
import { ReactionContext } from "./ReactionProvider";
import { PostContext } from "../posts/PostProvider";
import { Link } from "react-router-dom"

// This is getting the reactions associated with a post and showing the reactions on the post detail page under the post

export const MyReactions = () => {
    const [myReactions, setReactions] = useState([])
    const { getReactions, reactions } = useContext(ReactionContext)
    const { getPosts } = useContext(PostContext)

    const userId = localStorage.getItem('rare_user_id')

    useEffect(() => {
        getReactions().then((data) => setReactions(data))
    }, [])

    return (
        <div className='myReactions'>
            {
            reactions.map(reaction => {
                return (
                    <ul>
                    <button className='myReactions_post'>
                        {reaction.image_url} <div>1</div>
                    </button>
                    </ul>
                )
            })
            }
        </div>
    )
}
