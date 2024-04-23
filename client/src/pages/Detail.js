import { useContext, useEffect, useState } from "react"
import HTTPClient from "../utils/HTTPClient"
import { useParams } from "react-router-dom"
import TopHeader from "../components/TopHeader/TopHeader"
import { Context } from "../PageRouter"
import NotFound from "../components/NotFound/NotFound"


const Detail = () => {
    const {cart, setCart} = useContext(Context)
    const { product } = useParams()
    const [data, setData] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [loaded, setLoaded] = useState(false)
    useEffect(()=> {
        let client = new HTTPClient()
        client.getProductsByName(product)
            .then(res=> {
                setData(res.data)
                setLoaded(true)
            })
            .catch(err=> console.log(err))
    },[product])
    const handleChangeQuantity = (e) => {
        if(e.target.value>=1){
            setQuantity(e.target.value)
        }
    }
    const handleClick = () => { 
        const existingProductIndex = cart.findIndex(item => item.id === data._id)
        
        if(existingProductIndex !== -1){
            const updatedCart = cart.map((item, index) =>
                index === existingProductIndex ? { ...item, quantity: item.quantity + parseInt(quantity) } : item
            )
            console.log("updatedCart ", updatedCart)
            setCart(updatedCart)
        }
        else{
            setCart([...cart, {id: data._id, quantity: parseInt(quantity)}])
        }
    }
    return <div>
        <TopHeader />
        <div>
            <div className="max-w-6xl mx-auto flex flex-col justify-between">
                {
                    loaded ? 
                    <div className="text-xl">
                        <div className="flex mb-10">
                            <div className="mr-20">
                                <img src={data.imgUrl} alt={data.name} style={{maxHeight: "400px",maxWidth: "500px",borderRadius: "20px"}} />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h1 className="text-4xl mb-8">{data.title}</h1>
                                <p className="text-green-600 mb-4"> {data.price}$</p>
                                <div>
                                    <input className="mr-2 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 w-20" type="number" value={quantity} onChange={handleChangeQuantity}/>
                                    <button className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>Add to cart</button>
                                </div>
                                <p>Category: {data.category}</p>
                            </div>
                        </div>
                        <div>
                            <p>Description: {data.description}</p>
                        </div>
                    </div>
                    : <NotFound />
                }
            </div>
        </div>
    </div>
}
export default Detail