import React, { useState } from "react";
export const ReactionContext = React.createContext();

export const ReactionProvider = (props) => {
    const [reactions, setReactions] = useState([]);

    const getReactions = () => {
    return fetch("http://localhost:8000/reactions", {
        headers: {
            Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
        },
    })
        .then(res => res.json())
        .then(setReactions)
    };

    const addReaction = newReaction => {
    return fetch("http://localhost:8000/reactions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
        },
        body:JSON.stringify(newReaction)
    })
        .then(res => res.json())
        .then(getReactions)
    };

    const getReactionById = (id) => {
        return fetch(`http://localhost:8000/reactions/${id}`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(res => res.json())
    };
    
    const editReactions = (reaction) => {
        return fetch(`http://localhost:8000/reactions/${reaction.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
            },
            body: JSON.stringify(reaction)
        })
            .then(getReactions)
        }

    return(
        <ReactionContext.Provider value={{ reactions, getReactions, addReaction, getReactionById, editReactions }}>
            {props.children}
        </ReactionContext.Provider>
    )
}
