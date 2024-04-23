import {Link} from "react-router-dom"
import { useContext, useState } from "react"
import { Context } from "../../PageRouter"

const ProductCard = ({product}) => {
    const {cart, setCart} = useContext(Context)
    const [buttonText, setButtonText] = useState("Add to Cart")
    const handleClick = () => {
        const existingProductIndex = cart.findIndex(item => item.id === product._id);
        if(existingProductIndex !== -1){
            const updatedCart = cart.map((item, index) =>
                index === existingProductIndex ? { ...item, quantity: item.quantity + 1 } : item
            )
            setCart(updatedCart)
        }
        else{
            setCart([...cart, {id: product._id, quantity: 1, price: product.price}])
        }
        setButtonText("Added to Cart")
    }
    return <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md flex flex-col mb-4">
        <Link to={`/category/${product.category}/${product.name}`}>
            <div className="h-40 overflow-hidden">
                <img className="object-cover w-full h-full" src={product.imgUrl} alt={product.name}/>
            </div>
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                <p className="text-green-600">{product.price}$</p>
            </div>
        </Link>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded" onClick={handleClick}>{buttonText}</button>
    </div>
}
export default ProductCard