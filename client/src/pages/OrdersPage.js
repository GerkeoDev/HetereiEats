import { useNavigate } from "react-router-dom"
import TopHeader from "../components/TopHeader/TopHeader"
import { useContext, useEffect, useState } from "react"
import HTTPClient from "../utils/HTTPClient"
import { Context } from "../PageRouter"

const OrdersPage = () => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        if(user.logged) {
            let client = new HTTPClient()

            client.getOrders(user.id)
                .then(res => setOrders(res.data))
                .catch(err => console.log(err))
                .finally(() => setLoading(false))
        }
    }, [])
    return <div> 
        <TopHeader />
        <div className="">
            <div className="max-w-6xl mx-auto flex flex-col justify-between">
                <h1 className="text-4xl mb-8">Orders</h1>
                {user.logged?
                    loading ? <div className="text-2xl">Loading...</div>
                    : orders.length>0 ? <div>
                        {orders.map((order, idx) => <div key={idx} className="border rounded-md p-4 mb-4 shadow-md">
                                <h2 className="text-lg font-semibold">Order #{idx + 1}</h2>
                                <p className="mb-1">Total: ${order.total}</p>
                                <p>Status: {
                                    order.status==="Pending"?
                                        <spam className="border rounded-md bg-yellow-500 p-1">{order.status}</spam>
                                    : <spam className="border rounded-md bg-green-500 p-1">{order.status}</spam>
                                }</p>
                            </div>    
                        )}
                    </div>
                    : <div>
                        <h1 className="text-xl mb-2 ml-4">No orders</h1>
                        <button className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded" onClick={() => navigate("/")}>
                            Return to homepage
                        </button>
                    </div>
                : <div className="text-2xl">Oops, you're not logged in.</div>
                }
                
            </div>
        </div>
    </div>
}
export default OrdersPage
