import React, {useState, createContext} from "react";

export const CategoryContext = createContext()

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([])

    const getCategories = () => {
    return fetch("http://localhost:8000/categories", {
        headers: {
            Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
        },
    })
    .then((res) => res.json())
    .then(setCategories)
}

    const addCategory = newCategory => {
    return fetch("http://localhost:8000/categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
        },
        body: JSON.stringify(newCategory)
    })
        .then(getCategories)
}

    const getCategoryById = (id) => {
        return fetch(`http://localhost:8000/categories/${id}`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(res => res.json())
    }

    const deleteCategory = (categoryID) => {
        return fetch(`http://localhost:8000/categories/${categoryID}`, {
            method: "DELETE",
            headers: {
                Authorization: `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(getCategories)
    }

    const editCategory = (category) => {
        return fetch(`http://localhost:8000/categories/${category.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
            },
            body: JSON.stringify(category)
        })
            .then(getCategories)
        }

    return (
            <CategoryContext.Provider value={{
            categories, getCategories, addCategory, getCategoryById, deleteCategory, editCategory }}>
            {props.children}
            </CategoryContext.Provider>
    )
}