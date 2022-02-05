import React, { useState, useEffect, useRef,useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import {SubscriptionContext} from "./SubscriptionProvider"

export const SubscriptionCreate = () => {
    const label = useRef()
    const history = useHistory()
    const {subscription_id} = useParams()
    const { subscription, addSubscription, getSubscriptions, setSubscription } = useContext(SubscriptionContext)

    useEffect(() => {
        getSubscriptions().then((data) => setSubscription(data))
    }, [])

    const handleControlledInputChange = (event) => {
        const newSubscription = { ...subscription }
        newSubscription[event.target.id] = event.target.value
        setSubscription(newSubscription)
    }

    const handleSaveCategory= () => {

        if (subscription_id === 0) {
            window.alert("Please enter subscription")
        } else {
            addSubscription({
                label: subscription.label
            })
            .then(() => history.push("/subscription"))
        }
    }

    return(
        <form className="subscriptionForm">
            <h2 className="categoryForm_title">New Category</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="label">Category: </label>
                    <input type="text" id="label" ref={label} required autoFocus className="form-control" placeholder="Category" onChange={handleControlledInputChange} defaultValue={subscription.label} />
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