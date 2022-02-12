// This is the form for an admin to create a new reaction

import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router";
import { ReactionContext } from "./ReactionProvider";

export const ReactionForm = () => {
    const history = useHistory()
    const {getReactionById, editReactions, addReaction} = useContext(ReactionContext)
    
    const [reaction, setReaction] = useState({label: '', image_url: ''})
    const [newReaction, setNewReaction] = useState({})

    const { reactionId } = useParams()
    const editMode = reactionId ? true : false
    
    const handleControlledInputChange = (event) => {
        newReaction[event.target.name] = event.target.value
        setNewReaction(newReaction)
    }
    
    useEffect(() => {
        if(editMode){
            getReactionById(reactionId).then((data) => {
                setReaction(data)
            })
        }
    },[])
     
    const createNewReaction = () => {
        if (editMode) {
            editReactions({
                id: reaction.id,
                label: newReaction.label
                // image_url: newReaction.image_url
            })
            .then(() => history.push('/reactions'))
        }else{
            addReaction({
                label: newReaction.label
            })
            .then(() => history.push('/reactions'))
        }
    }

    return (
        <div className='reaction_edit'>
            <form className='reaction_edit_form'>
                <fieldset>
                    <div className="reaction_edit_form_group">
                            <label htmlFor="name">Reaction Name: </label>
                            <input type="text" name="label" required autoFocus className="form-control"
                                placeholder="new reaction name"
                                defaultValue={reaction.label}
                                onChange={handleControlledInputChange}/>
                    </div>
                    <div className="reaction_edit_form_group">
                            <label htmlFor="name">Reaction Image: </label>
                            <input type="url" name="label" required autoFocus className="form-control"
                                placeholder="new reaction image url"
                                defaultValue={reaction.image_url}
                                onChange={handleControlledInputChange}/>
                    </div>
                </fieldset>
            </form>
            <button type="submit" 
                onClick={evt => {
                evt.preventDefault()
                createNewReaction()
                }}
                className="bt btn-primary">
                {editMode ? "Save Edit" : "Create A New Reaction"}
            </button>
            <button className='reaction_edit--cancel' onClick={() => {history.push('/reactions')}}>Cancel</button>
        </div>
    )
}
