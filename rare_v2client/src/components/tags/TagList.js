import React, { useState, useEffect, useContext } from "react"
import { useHistory } from 'react-router-dom'
import { TagContext } from "./TagProvider";



export const TagList = (props) => {


    const {deleteTag, tags, getTags} = useContext(TagContext)
    
    const handleDelete = (id) => {
        deleteTag(id)
        .then(() => {

        })
    }

    useEffect(() => {
        getTags()
    }, [])

    const history = useHistory()

    return(
        
        <div className='tags'>
            <h2 className='tags_title'>Tags</h2>
            <button onClick={() => history.push("/tags/create")}>
                Create Tag
            </button>
            <ul className='tags_list'>
                {
                tags.map(tag => {
                    return (
                        <li key={tag.id}>
                          {tag.label}
                          <div>
                            <button className='settings_btn' 
                            onClick={() => {history.push(`/tags/edit/${tag.id}`)}}>🖊</button>
                            <button className='delete_btn' onClick={() => {handleDelete(tag.id)}}>🚫</button>
                          </div>
                        </li>
                    )
                })
                }
            </ul>
        </div>
   
    )
}