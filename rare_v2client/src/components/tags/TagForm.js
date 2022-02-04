import React, { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router"
import { TagContext } from "./TagProvider";

export const TagForm = () => {
    const history = useHistory()
    const {getTagById, editTags, addTag} = useContext(TagContext)
    
    const [tag, setTag] = useState({label: ''})
    const [newTag, setNewTag] = useState({})

    const { tagId } = useParams()
    const editMode = tagId ? true : false
    
    const handleControlledInputChange = (event) => {
        newTag[event.target.name] = event.target.value
        setNewTag(newTag)
    }
    
    useEffect(() => {
        if(editMode){
            getTagById(tagId).then((data) => {
                setTag(data)
            })
        }
    },[])
     
    const createNewTag = () => {
        if (editMode) {
            editTags({
                id: tag.id,
                label: newTag.label
            })
            .then(() => history.push('/tags'))
        }else{
            addTag({
                label: newTag.label
            })
            .then(() => history.push('/tags'))
        }
    }

    return (
        <div className='tag_edit'>
            <form className='tag_edit_form'>
                <fieldset>
                    <div className="tag_edit_form_group">
                            <label htmlFor="name">Tag Name: </label>
                            <input type="text" name="label" required autoFocus className="form-control"
                                placeholder="Tag label"
                                defaultValue={tag.label}
                                onChange={handleControlledInputChange}/>
                    </div>
                </fieldset>
            </form>
            <button type="submit" 
                onClick={evt => {
                evt.preventDefault()
                createNewTag()
                }}
                className="bt btn-primary">
                {editMode ? "Save Edit" : "Create Tag"}
            </button>
            <button className='tag_edit--cancel' onClick={() => {history.push('/tags')}}>Cancel</button>
        </div>
    )
}