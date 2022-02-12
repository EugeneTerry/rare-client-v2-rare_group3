import React, { useState, useEffect,useContext } from "react"
import { useHistory } from 'react-router-dom'
import { CategoryContext} from "./CategoryProvider"
import "./Category.css"


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
                <button className="button" onClick={() => history.push("/categories/create")}>
                    Create Category
                </button>
                <ul className='categories_list'>
                    {
                        categories.map(category => {
                            return (
                                <div>
                                    {category.label}
                                    <button className='button'
                                        onClick={() => { history.push(`/categories/edit/${category.id}`) }}>Edit</button>
                                    <button className="button" onClick={() => { handleDelete(category.id) }}>Delete</button>
                                </div>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    )
}