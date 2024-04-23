import { useContext, useEffect, useState } from "react"
import TopHeader from "../components/TopHeader/TopHeader"
import { Context } from "../PageRouter"
import { useNavigate } from "react-router-dom"
import HTTPClient from "../utils/HTTPClient"
import MapLocation from "../components/MapLocation/MapLocation"

const CartPage = () => {
    const {cart, setCart, user, setUser} = useContext(Context)
    const [products, setProducts] = useState([])
    const [subtotal, setSubtotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(()=> {
        fetchProducts()
    },[cart])
    useEffect(()=> {
        calculateSubtotal()
        setLoading(false)
    },[products, cart])
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
    const calculateSubtotal = () => {
        let subtotal = 0
        products.forEach((product, idx) => {
            if(cart[idx] && cart[idx].quantity){
                subtotal += (product.price * cart[idx].quantity)
            }
        })
        setSubtotal(subtotal)
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
                <h1 className="text-4xl mb-8 ">Cart</h1>
                {loading ? <div className="text-4xl">Loading...</div> 
                : cart.length > 0 ? 
                    <div className="flex justify-between">
                        <div>
                            <div className="p-8 border rounded shadow-md mr-8">
                                <table className="text-start">
                                    <thead>
                                        <tr>
                                            <th className="w-10"></th>
                                            <th className="min-w-40"></th>
                                            <th className="min-w-40">Product</th>
                                            <th className="w-40">Price</th>
                                            <th>Quantity</th>
                                            <th className="w-28">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product, idx)=>{
                                            return  <tr key={idx} className="h-32">
                                                <td>
                                                    <button className="mr-4 text-xl" onClick={()=>handleRemove(idx)}>x</button>
                                                </td>
                                                <td>
                                                    <img className="h-28 border rounded" src={product.imgUrl} alt={product.name} />
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
                        <div>
                            <div className="w-80 border rounded justify-center p-6 shadow-md">
                                <div className="pb-3 flex justify-between items-center">
                                    <p className=" font-bold">Subtotal: </p>
                                    <p>{subtotal}$</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className=" font-bold">Choose delivery location: </p>
                                    <p></p>
                                </div>
                                <div className="pb-3 flex justify-between items-center">
                                    <p>
                                        <MapLocation />
                                    </p>
                                </div>
                                <div className="pb-3 flex justify-between items-center">
                                    <p className=" font-bold">Total: </p>
                                    <p>{subtotal}$</p>
                                </div>
                                <button 
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded"
                                    onClick={() => {
                                        if (user.logged) {
                                            navigate("/checkout")
                                        } else {
                                            navigate("/login")
                                        }
                                    }}
                                >Proceed to checkout</button>
                            </div>
                        </div>
                    </div>
                :
                    <div>
                        <h1 className="text-xl mb-2">Your cart is empty</h1>
                        <button className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded" onClick={() => navigate("/")}>
                            Return to homepage
                        </button>
                    </div>
                }
            </div>
        </div>
    </div>
}
export default CartPage