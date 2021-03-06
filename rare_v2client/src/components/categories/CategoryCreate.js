import React, { useState, useEffect, useRef,useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import {CategoryContext} from "./CategoryProvider"

export const CategoryCreate = () => {
    const label = useRef()
    const history = useHistory()
    const {category_id} = useParams()
    const { addCategory, getCategories } = useContext(CategoryContext)

    const [category, setCategory]=useState({})
    
    useEffect(() => {
        getCategories()
    }, [])

    const handleControlledInputChange = (event) => {
        const newCategory = { ...category }
        newCategory[event.target.id] = event.target.value
        setCategory(newCategory)
    }

    const handleSaveCategory= () => {

        if (category_id === 0) {
            window.alert("Please enter category")
        } else {
            addCategory({
                label: category.label
            })
            .then(() => history.push("/categories"))
        }
    }

    return(
        <form className="categoryForm">
            <h2 className="categoryForm_title">New Category</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="label">Category: </label>
                    <input type="text" id="label"  required autoFocus className="form-control" placeholder="Category" onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <button type="submit"
                onClick={event => {
                    event.preventDefault()
                    handleSaveCategory()
                }}
                className="btn btn-primary">
                    Save Category
                </button>
        </form>
    )


}