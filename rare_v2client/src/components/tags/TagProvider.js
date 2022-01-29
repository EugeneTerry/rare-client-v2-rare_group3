import React, { useState } from "react";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
    const [tags, setTags] = useState([]);

    const getTags = () => {
    return fetch("http://localhost:8000/tags", {
        headers: {
            Authorization: `Token ${localStorage.getItem("lu_token")}`,
        },
    })
        .then(res => res.json())
        .then(setTags)
    };

    const addTag = tag => {
    return fetch("http://localhost:8000/tags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("lu_token")}`,
        },
        body:JSON.stringify(tag)
    })
        .then(res => res.json())
        .then(getTags)
    };

    const deleteTag = (tag_id) => {
    return fetch(`http://localhost:8000/tags/${tag_id}`, {
        method: "DELETE",
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
    })
        .then(getTags)
    }
  
    const editTags = (tag) => {
    return fetch(`http://localhost:8000/tags/${tag.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("lu_token")}`,
        },
        body: JSON.stringify(tag)
    })
        .then(res => res.json())
        .then(getTags)
    }
    return(
        <TagContext.Provider value={{tags, getTags, addTag, deleteTag, editTags}}>
            {props.children}
        </TagContext.Provider>
    )
}