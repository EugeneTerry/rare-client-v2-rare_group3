import React, {useState, createContext} from "react";

export const SubscriptionContext = createContext()

export const SubscriptionProvider = (props) => {
    const [subscriptions, setSubscriptions] = useState([])

    const getSubscriptions = () => {
    return fetch("http://localhost:8000/subscriptions", {
        headers: {
            Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
        },
    })
    .then((res) => res.json())
    .then(setSubscriptions)
}

    const addSubscription = newSubscription => {
    return fetch("http://localhost:8000/subscriptions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
        },
        body: JSON.stringify(newSubscription)
    })
        .then(getSubscriptions)
}

    const getSubscriptionById = (id) => {
        return fetch(`http://localhost:8000/subscriptions/${id}`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(res => res.json())
    }

    const deleteSubscription = (subscriptionID) => {
        return fetch(`http://localhost:8000/subscriptions/${subscriptionID}`, {
            method: "DELETE",
            headers: {
                Authorization: `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(getSubscriptions)
    }

    const editSubscription = (subscription) => {
        return fetch(`http://localhost:8000/tags/${subscription.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
            },
            body: JSON.stringify(subscription)
        })
            .then(getSubscriptions)
        }

    return (
            <SubscriptionContext.Provider value={{
            subscriptions, getSubscriptions, addSubscription, getSubscriptionById, deleteSubscription, editSubscription }}>
            {props.children}
            </SubscriptionContext.Provider>
    )
}