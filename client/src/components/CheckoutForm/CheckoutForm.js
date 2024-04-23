import { CardElement } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import HTTPClient from "../../utils/HTTPClient";
import { Context } from "../../PageRouter";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({amount}) => {
    const navigate = useNavigate()
    const {setCart, user, cart, latLng} = useContext(Context)
    const description = "Test payment"
    const [error, setError] = useState(null)
    const [messageError, setMessageError] = useState(null)
    const [loadingPayment, setLoadingPayment] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const handleSubmit = async e => {
        e.preventDefault()
        setMessageError(null)
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })
        setLoadingPayment(true)

        if(!error){
            const {id} = paymentMethod
            try {
                let client = new HTTPClient()

                const { data } = await client.payment(id, amount, description)
                // console.log(data)
                if(!data.error){
                    client.getOrders(user.id)
                        .then(res => {
                            const orders = res.data
                            orders.push({
                                products: cart,
                                adress: latLng,
                                total: amount,
                                status: "Pending"
                            })
                            client.setUserOrders(orders, user.id)
                                .then(res => {
                                    setCart([])
                                    navigate('/my-account/orders')
                                })
                        })
                }
                if(data.error){
                    setMessageError(data.message)
                }
                elements.getElement(CardElement).clear()
            } catch (err) {
                console.log(err)
            }
            setLoadingPayment(false)
        }
    }
    return <form onSubmit={handleSubmit} className=" w-full max-w-md p-6 border rounded-lg shadow-md">
        <div className="mb-4 flex items-center">
            <p className="text-sm font-medium text-gray-700 mr-4">Total:</p>
            <p className="text-lg font-medium text-green-700">{amount}</p>
        </div>
        <div className="mb-4">
            <label htmlFor="card" className="block text-sm font-medium text-gray-700">Card Information</label>
            {messageError? <div className="text-sm text-red-700">{messageError}*</div>: null}
            <div id="card" className="p-2 border rounded-md">
                <CardElement />
            </div>
        </div>
        <button 
            type="submit" 
            className={`w-full py-2 px-4 rounded focus:outline-none ${stripe && !loadingPayment ? 'bg-green-500 hover:bg-green-600 text-white font-bold' : 'bg-gray-400 cursor-not-allowed text-gray-700'}`}
            disabled={!stripe}
            >
            {loadingPayment ? "Loading..." : "Pay"}
        </button>
    </form>
}
export default CheckoutForm