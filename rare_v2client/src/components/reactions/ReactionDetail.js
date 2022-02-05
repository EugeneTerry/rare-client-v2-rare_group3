// import React, { useState, useEffect, useRef, useContext } from "react";
// import { useHistory, useParams } from "react-router-dom";
// import { ReactionContext } from "./ReactionProvider";

// // This is

// export const ReactionDetail = () => {
//     const label = useRef()
//     const {getReactions, addReaction} = useContext(ReactionContext)

//     const history = useHistory()
//     const {reaction_id} = useParams()
//     const [reaction, setReaction] = useState([]);

//     useEffect(() => {
//         getReactions().then((data) => setReaction(data))
//     }, [])

//     const handleControlledInputChange = (event) => {
//         const newReaction = { ...reaction }
//         newReaction[event.target.id] = event.target.value
//         setReaction(newReaciton)
//     }

//     const handleSaveReaction= () => {

//         if (reaction_id === 0) {
//             window.alert("Please enter reaction")
//         } else {
//             addReaction({
//                 label: reaction.label
//             })
//             .then(() => history.push("/reactions"))
//         }
//     }

//     return(
//         <form className="reactionForm">
//             <h2 className="reactionForm_title">New Reaction</h2>
//             <fieldset>
//                 <div className="form-group">
//                     <label htmlFor="label">Reaction: </label>
//                     <input type="text" id="label" ref={label} required autoFocus className="form-control" placeholder="Tag" onChange={handleControlledInputChange} defaultValue={reaction.label} />
//                 </div>
//             </fieldset>
//             <button type="submit"
//                 onClick={event => {
//                     event.preventDefault()
//                     handleSaveReaction()
//                 }}
//                 className="btn btn-primary">
//                     Save Reaction
//                 </button>
//         </form>
//     )
// }
