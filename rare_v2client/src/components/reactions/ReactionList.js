// import React, { useState, useEffect, useContext } from "react"
// import { useHistory } from 'react-router-dom'
// import { ReactionContext } from "./ReactionProvider";

// // This is doing what ???

// export const ReactionList = (props) => {

//     const {reactions, getReactions} = useContext(ReactionContext)
    
//     // const handleDelete = (id) => {
//     //     deleteReaction(id)
//     //     .then(() => {

//     //     })
//     // }

//     useEffect(() => {
//         getReactions()
//     }, [])

//     const history = useHistory()

//     return(
        
//         <div className='reactions'>
//             <h2 className='reactions_title'>Reactions</h2>
//             <button onClick={() => history.push("/reactions/create")}>
//                 Create Reaction
//             </button>
//             <ul className='reactions_list'>
//                 {
//                 reactions.map(reaction => {
//                     return (
//                         <li key={reaction.id}>
//                           {reaction.label}
//                           <div>
//                             <button className='settings_btn' 
//                             onClick={() => {history.push(`/reactions/edit/${reaction.id}`)}}>🖊</button>
//                             {/* <button className='delete_btn' onClick={() => {handleDelete(reaction.id)}}></button> */}
//                           </div>
//                         </li>
//                     )
//                 })
//                 }
//             </ul>
//         </div>
   
//     )
// }
