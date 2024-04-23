import { useContext, useState } from "react"
import {useNavigate} from "react-router-dom"
import HTTPClient from "../../utils/HTTPClient"
import { Context } from "../../PageRouter"

const LoginForm = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({})
    const [errors, setErrors] = useState({})
    const {cart, setCart, user, setUser} = useContext(Context)
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const validate = () => {
        let flag = true
        let errors = {}
        if(!data.password){
            errors.password = "Required password"
            flag = false
        }else if(data.password.length < 5){
            errors.password = "The password must be at least 5 characters long"
            flag = false
        }
        if(!data.email){
            errors.email = "Required email"
            flag = false
        }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)){
            errors.email = "Invalid email address"
            flag = false
        }
        
        setErrors(errors)
        return flag
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!validate()){
            console.log(errors)
            return
        }
        let client = new HTTPClient()

        client.login(data.email, data.password)
            .then(res => {
                const {id, userName} = res.data.user
                setUser({logged: true, id: id, userName: userName})
                
                client.getCart(id)
                    .then(res => {
                        if(cart.length>0 && res.data.length === 0){
                            client.setUserCart(cart, id)
                                .then(res => {
                                    console.log(res)
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        }else{
                            setCart(res.data)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                
                
                console.log("Successful Login", user)
                navigate("/")
        })
            .catch(err => {
                if(err.response){
                    setErrors(err.response.data)
                }
                console.log(err)
            })
        setData({})
    }
    return <div className="min-h-72 min-w-96 border rounded flex flex-col justify-center items-center shadow-md">
        <h1 className="text-2xl mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
            {errors.error && <small className="text-red-800 text-sm">{errors.error}*</small>}
            <div className="mb-2 flex flex-col">
                <label htmlFor="email">Email </label>
                {errors.email && <small className="text-red-800 text-sm">{errors.email}*</small>}
                <input 
                    className="border border-gray-300 rounded-md py-1 px-1 focus:outline-none focus:border-blue-500 w-64"
                    type="email" name="email" value={data.email || ""} onChange={handleChange} required={true} 
                />
            </div>
            <div className="mb-8 flex flex-col">
                <label htmlFor="password">Password </label>
                {errors.password && <small className="text-red-800 text-sm">{errors.password}*</small>}
                <input 
                    className="border border-gray-300 rounded-md py-1 px-1 focus:outline-none focus:border-blue-500 w-64"
                    type="password" name="password" value={data.password || ""} onChange={handleChange} required={true} minLength={5} 
                />
            </div>
            <div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-28 rounded" type="submit">Login</button>
            </div>
        </form>
    </div>
}
export default LoginForm