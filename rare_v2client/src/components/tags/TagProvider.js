import React, { useState } from "react";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
    const [tags, setTags] = useState([]);

    const getTags = () => {
    return fetch("http://localhost:8000/tags", {
        headers: {
            Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
        },
    })
        .then(res => res.json())
        .then(setTags)
    };

    const addTag = newTag => {
    return fetch("http://localhost:8000/tags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
        },
        body:JSON.stringify(newTag)
    })
        // .then(res => res.json())
        .then(getTags)
    };

    const getTagById = (id) => {
        return fetch(`http://localhost:8000/tags/${id}`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(res => res.json())
    }

    const deleteTag = (tag_id) => {
    return fetch(`http://localhost:8000/tags/${tag_id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Token ${localStorage.getItem("rare_user_id")}`
        }
    })
        .then(getTags)
    }
  
    const editTags = (tag) => {
    return fetch(`http://localhost:8000/tags/${tag.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
        },
        body: JSON.stringify(tag)
    })
        .then(getTags)
    }
    return(
        <TagContext.Provider value={{tags, getTags, addTag, deleteTag, getTagById, editTags}}>
            {props.children}
        </TagContext.Provider>
    )
}