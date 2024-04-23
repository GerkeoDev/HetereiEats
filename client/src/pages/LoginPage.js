import { useContext } from "react"
import LoginForm from "../components/LoginForm/LoginForm"
import RegisterForm from "../components/RegisterForm/RegisterForm"
import TopHeader from "../components/TopHeader/TopHeader"
import { Context } from "../PageRouter"
import { useNavigate } from "react-router-dom"

const LoginPage = (props) => {
    const {cart, setCart, user, setUser} = useContext(Context)
    const navigate = useNavigate()
    return <div>
        <TopHeader />
        <div className="">
            <div className="max-w-6xl mx-auto flex flex-col justify-between">
                <div className="mb-16 flex justify-center">
                    <h1 className="text-4xl">My Account</h1>
                </div>
                { !user.length>0?
                    <div className="flex justify-around min-h-96">
                        <RegisterForm />
                        <LoginForm />
                    </div>
                    : <div>
                        <h1 className="text-3xl mb-4">You are now logged in.</h1>
                        <button className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded" onClick={() => navigate("/")}>
                            Go to home
                        </button>
                    </div>
                }
            </div>
        </div>
    </div>
}
export default LoginPage