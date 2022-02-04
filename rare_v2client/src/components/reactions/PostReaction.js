import React, { useEffect, useState, useContext } from "react";
import { ReactionContext } from "./ReactionProvider";
import { PostContext } from "../posts/PostProvider"

// This is 

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
                    <div className='myReactions_post'>
                        <img src={reaction.image_url} alt='reaction_image'/>
                    </div>
                )
            })
            }
        </div>
    )
}
