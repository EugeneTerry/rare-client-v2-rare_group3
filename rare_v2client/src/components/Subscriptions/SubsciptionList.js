import React, { useState, useEffect,useContext } from "react"
import { useHistory } from 'react-router-dom'
import { SubscriptionContext} from "./SubscriptionProvider"
// import "./Categories.css"


export const SubscriptionList = (props) => {
    const [ subscription, setSubscription] = useState([])
    const history = useHistory()
    const { subscriptions, getSubscriptions, deleteSubscription } = useContext(SubscriptionContext)
  
  

    const handleDelete = (id) => {
        deleteSubscription(id)
        .then(() => {
            const remainingSubscriptions = subscriptions.filter( subscription => subscription.id !== id )
            setSubscription(remainingSubscriptions)
        })
    }

    useEffect(() => {
        getSubscriptions().then(Data => setSubscription(Data))
      }, [])

    return (
        <>
            <div className='subscriptions'>
                <h2 className='subscriptions_title'>Subscriptions</h2>
                <button onClick={() => history.push("/subscriptions/create")}>
                    Create Subscription
                </button>
                <ul className='subscriptions_list'>
                    {
                        categories.map(subscription => {
                            return (
                                <li>
                                    {subscription.label}
                                    <button className='subscription_edit'
                                        onClick={() => { history.push(`/subscription/edit/${subscription.id}`) }}>Edit</button>
                                    <button onClick={() => { handleDelete(subscription.id) }}>Delete Subscription</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    )
}