import React, { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router"
import { SubscriptionContext } from "./SubscriptionProvider"

export const CategoryForm = () => {
  const history = useHistory()

  const [subscription, setSubscription] = useState([])
  const [theSubscription, setTheSubscription] = useState({ label: '' })
  const [newSubscription, setNewSubscription] = useState({})
  const { subscriptions, getSubscriptions, editSubscriptions } = useContext(SubscriptionContext)
  const { subscriptionId } = useParams()

  useEffect(() => {
    getSubscriptions().then((data) => setSubscription(data))
  }, [])

  useEffect(() => {
    const theSubscription = subscriptions.find(category => category.id === parseInt(subscriptionId)) || { label: '' }
    setTheSubscription(theSubscription)
  }, [subscriptions, subscriptionId])


  const handleControlledInputChange = (event) => {
    newSubscription[event.target.name] = event.target.value
    setNewSubscription(newSubscription)
  }

  const handleSaveEdit = (e) => {
    e.preventDefault()

    editSubscriptions({
      id: theSubscription.id,
      label: newSubscription.label
    }).then(() => {
      history.push('/subscriptions')
    })
  }

  return (
    <div className='subscription_edit'>
      <form className='subscription_edit_form'>
        <fieldset>
          <div className="subscription_edit_form_group">
            <label htmlFor="name">Subscription Name: </label>
            <input type="text" name="label" required autoFocus className="form-control"
              placeholder="Category label"
              defaultValue={theSubscription.label}
              onChange={handleControlledInputChange} />
          </div>
        </fieldset>
      </form>
      <button className='subscription_edit--save' onClick={handleSaveEdit}>Save</button>
      <button className='subscription_edit--cancel' onClick={() => { history.push('/subscriptions') }}>Cancel</button>
    </div>
  )
}