import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import icon from "../../assets/icons/heterei-eats-icon.png"
import cartIcon from "../../assets/icons/orange-cart.png"
import facebookIcon from "../../assets/icons/white-facebook.png"
import instagramIcon from "../../assets/icons/white-instagram.png"
import twitterIcon from "../../assets/icons/white-twitter.png"
import whatsappIcon from "../../assets/icons/white-whatsapp.png"
import { Context } from "../../PageRouter"

const TopHeader = () => {
    const navigate = useNavigate()
    const {cart, setCart, user, setUser} = useContext(Context)
    return <div className="text-lg mb-12 shadow-md">
        <div className="bg-orange-400 text-black p-2">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <div>
                    <span>+595 999 999999</span>
                    <span className="ml-8">Monday to Sunday from 08:00 to 22:00</span>
                </div>
                <div className="flex">
                    <Link to={""} className="mx-1 mr-2">
                        <img src={facebookIcon} alt="icon" className="w-6" />
                    </Link>
                    <Link to={""} className="mx-1 mr-2">
                        <img src={instagramIcon} alt="icon" className="w-6" />
                    </Link>
                    <Link to={""} className="mx-1 mr-2">
                        <img src={twitterIcon} alt="icon" className="w-6" />
                    </Link>
                    <Link to={""}>
                        <img src={whatsappIcon} alt="icon" className="w-6" />
                    </Link>
                </div>
            </div>
        </div>
        <div className="bg-white p-2">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <Link to={"/"}>
                    <img src={icon} alt="icon" className="w-40" />
                </Link>
                <div className="">
                    <Link to={"/"} className="mx-4">Home </Link>
                    <Link to={"/category/fast-food"} className="mx-4">Fast Food </Link>
                    <Link to={"/category/snacks"} className="mx-4">Snacks </Link>
                    <Link to={"/category/sandwiches"} className="mx-4">Sandwiches </Link>
                    <Link to={"/category/pasta"} className="mx-4">Pasta </Link>
                    <Link to={"/category/cakes"} className="mx-4">Cakes </Link>
                    <Link to={"/category/fit"}>Fit </Link>
                </div>
                <Link to={"/cart"} className="mx-1 mr-2">
                        <img src={cartIcon} alt="icon" className="w-6" />
                </Link>
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded shadow-md" onClick={() => {
                    user.logged?navigate("/my-account"):navigate("/login")
                }}>{user.logged?"My account":"Sign in"}</button>
            </div>
        </div>
    </div>
}
export default TopHeader