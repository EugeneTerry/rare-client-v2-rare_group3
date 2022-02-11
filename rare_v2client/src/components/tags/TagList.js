import React, { useState, useEffect, useContext } from "react"
import { useHistory } from 'react-router-dom'
import { TagContext } from "./TagProvider";



export const TagList = (props) => {


    const {deleteTag, tags, getTags, addTag} = useContext(TagContext)
    const [newTag, setNewTag] = useState({})
    
    const handleDelete = (id) => {
        deleteTag(id)
        .then(() => {

        })
    }

    useEffect(() => {
        getTags()
    }, [])

    const history = useHistory()

    // create a tag form here
    const handleControlledInputChange = (event) => {
        newTag[event.target.name] = event.target.value
        setNewTag(newTag)
    }

    const createNewTag = () => {
            addTag({
                label: newTag.label
            })
            .then(() => history.push('/tags'))
    
    }

    //end form
    return(
        <>
        <div className='tags_list'>
            <h2 className='tags_title'>({tags.length}) Tags</h2>
            <div className='tags'><h5> 
            <ul className='tags_list'>
                {
                tags.map(tag => {
                    return (
                        <li key={tag.id}>
                          {tag.label} 
                          <div className="tag_cards">
                            <button className='edit_btn' 
                            onClick={() => {history.push(`/tags/edit/${tag.id}`)}}>🖊
                                <span className="tooltiptext">Edit</span></button>
                            <button className='delete_btn' onClick={() => {handleDelete(tag.id)}}>🚫<span className="tooltiptext">Delete</span></button> 
                          </div>
                        </li>
                    )
                }) 
                }
            </ul>
            </h5>
            {/* small create tag form here */}
            <div className='tag_create'>
                <form className='tag_create_form'>
                    <fieldset>
                        <div className="tag_create_form_group">
                                <label htmlFor="name">Create Tag: </label>
                                <input type="text" name="label" required autoFocus className="form-control"
                                    placeholder="Tag label"
                                    defaultValue=""
                                    onChange={handleControlledInputChange}/>
                        </div>
                            <button type="submit" 
                                onClick={evt => {
                                evt.preventDefault()
                                createNewTag()
                                {history.push('/tags')}
                                }}
                                className="bt btn-primary">
                                Submit
                            </button>
                    </fieldset>
                </form>
            </div>
            {/* create tag form end */}
            </div>
        </div>
        </>
   
    )
}