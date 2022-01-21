import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { deleteCategory, getCategories } from "./CategoryManager"
// import "./Categories.css"


export const CategoryList = () => {

    const [categories, setCategories] = useState([])
    
    const handleDelete = (id) => {
        deleteCategory(id)
        .then(() => {
            const remainingCategories = categories.filter( category => category.id !== id )
            setCategories(remainingCategories)
        })
    }

    useEffect(() => {
        getCategories().then((data) => setCategories(data))
    }, [])

    const history = useHistory()

    return(
        <>
        <div className='categories'>
            <h2 className='categories_title'>Categories</h2>
            <button onClick={() => history.push("/categories/create")}>
                Create Category
            </button>
            <ul className='categories_list'>
                {
                categories.map(category => {
                    return (
                        <li>
                          {category.label}
                          <button className='categories_edit' 
                          onClick={() => {history.push(`/categories/edit/${category.id}`)}}>Edit</button>
                          <button onClick={() => {handleDelete(category.id)}}>Delete Category</button>
                        </li>
                    )
                })
                }
            </ul>
        </div>
    </>
    )
}