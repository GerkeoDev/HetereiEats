import { useContext, useEffect, useState } from "react"
import { Context } from "../PageRouter"
import TopHeader from "../components/TopHeader/TopHeader"
import { useNavigate } from "react-router-dom"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "../components/CheckoutForm/CheckoutForm"
import HTTPClient from "../utils/HTTPClient"

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY)

const Checkout = () => {
    const [amount, setAmount] = useState(0)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const { cart, user, setCart} = useContext(Context)


    useEffect(()=> {
        if(!user.logged){
            navigate("/login")
        }
        fetchProducts()
    },[cart])
    
    useEffect(()=>{
        calculateSubtotal()
        setLoading(false)
    }, [products, cart])

    const calculateSubtotal = () => {
        let subtotal = 0
        products.forEach((product, idx) => {
            if(cart[idx] && cart[idx].quantity){
                subtotal += (product.price * cart[idx].quantity)
            }
        })
        setAmount(subtotal)
    }


    const fetchProducts = async () => {
        try {
            let client = new HTTPClient()
            const productDetails = await Promise.all(cart.map( async (item) => {
                const {data} = await client.getProduct(item.id)
                return data
            }))
            setProducts(productDetails)
        } catch (err) {
            console.error("Error fetching product details:", err)
        }
    }
    const handleChange = (e, idx) => {
        if(idx >= 0 && idx < cart.length && e.target.value > 0) {
            const newCart = [...cart]
            newCart[idx].quantity = parseInt(e.target.value)
            setCart(newCart)
        }
    }
    
    const handleRemove = idx => {
        const newCart = [...cart]
        newCart.splice(idx, 1)
        setCart(newCart)
    }
    return <div>
        <TopHeader />
        <div className="">
            <div className="max-w-6xl mx-auto flex flex-col justify-between items-center">
                <h1 className="text-4xl mb-8">Payment</h1>
                {loading ? <div className="text-4xl">Loading...</div> 
                : cart.length>0?
                    <Elements stripe={stripePromise} className="w-full">
                        <div className="p-8 flex justify-between">
                            <div>
                                <div className="border rounded-lg mr-8 shadow-md p-6">
                                    <table className="text-start">
                                        <thead>
                                            <tr>
                                                <th className=""></th>
                                                <th className="min-w-32"></th>
                                                <th className="w-44">Product</th>
                                                <th className="min-w-32">Price</th>
                                                <th className="min-w-32">Quantity</th>
                                                <th className="min-w-32">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((product, idx)=>{
                                                return  <tr key={idx} className="h-24">
                                                    <td>
                                                        <button className="mr-4 text-xl" onClick={()=>handleRemove(idx)}>x</button>
                                                    </td>
                                                    <td>
                                                        <img className="h-20 border rounded" src={product.imgUrl} alt={product.name} />
                                                    </td>
                                                    <td className="p-3">{product.title}</td>
                                                    <td className="text-center">{product.price}$</td>
                                                    <td className="text-center">
                                                        <input  
                                                            className="w-12 border border-gray-300 rounded-md py-1 focus:outline-none focus:border-blue-500 text-center"
                                                            type="number" value={cart[idx]?.quantity} onChange={e => handleChange(e, idx)}
                                                        />
                                                    </td>
                                                    <td className="text-center">
                                                        {product.price * cart[idx]?.quantity}$
                                                    </td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="w-96">
                                <CheckoutForm cart={cart} amount={amount}/>
                            </div>
                        </div>
                    </Elements>
                :
                    <div>
                        <h3 className="text-xl mb-2">Your cart is empty</h3>
                        <button className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded" onClick={() => navigate("/")}>
                            Return to homepage
                        </button>
                    </div>
                }
                
            </div>
        </div>
    </div>
}
export default Checkout