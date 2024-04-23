import { useContext, useEffect } from "react"
import TopHeader from "../components/TopHeader/TopHeader"
import { Context } from "../PageRouter"
import { useNavigate } from "react-router-dom"
import HTTPClient from "../utils/HTTPClient"

const AccountPage = () => {
    const navigate = useNavigate()
    const {cart, setCart, user, setUser, setLatLng} = useContext(Context)
    useEffect(() => {
        if(!user.logged){
            navigate("/login")
        }
    }, [])
    return <div>
        <TopHeader />
        <div className="">
            <div className="max-w-6xl mx-auto flex flex-col justify-between">
                <h1 className="text-4xl text-center mb-8">My account</h1>
                { user.logged && <div className="flex flex-col ">
                    <div className="text-xl mb-8 p-2 border">User name: {user.userName}</div>
                    <div className="text-xl mb-8 p-2 border">
                        <button className="w-40 mr-3 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded shadow-md" onClick={() => {
                            navigate("/my-account/orders")
                        }}>View my orders</button>
                        <button className="w-20 bg-red-700 hover:bg-red-800 text-white font-bold py-2 rounded shadow-md" onClick={() => {
                            if(window.confirm('Are you sure you want to log out?')){
                                const client = new HTTPClient()
                                client.logout()
                                    .then(res => {})
                                    .catch(err => {
                                        console.log(err)
                                    })
                                setCart([])
                                setUser({})
                                setLatLng({ lat: -25.28646, lng: -57.647 })
                                navigate("/")
                            }
                        }}>Log out</button>
                    </div>
                </div>
                }
            </div>
        </div>
    </div>
}
export default AccountPage