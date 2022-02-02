import React, { useState, useEffect,useContext } from "react"
import { useHistory } from 'react-router-dom'
import { CategoryContext} from "./CategoryProvider"
// import "./Categories.css"


export const CategoryList = (props) => {
    const [ category, setCategory] = useState([])
    const history = useHistory()
    const { categories, getCategories, deleteCategory } = useContext(CategoryContext)
  
  

    const handleDelete = (id) => {
        deleteCategory(id)
        .then(() => {
            const remainingCategories = categories.filter( category => category.id !== id )
            setCategory(remainingCategories)
        })
    }

    useEffect(() => {
        getCategories().then(Data => setCategory(Data))
      }, [])

    return (
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
                                        onClick={() => { history.push(`/categories/edit/${category.id}`) }}>Edit</button>
                                    <button onClick={() => { handleDelete(category.id) }}>Delete Category</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    )
}