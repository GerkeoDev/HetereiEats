import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import CategoryPage from './pages/CategoryPage'
import CartPage from './pages/CartPage'
import Detail from './pages/Detail'
import AccountPage from './pages/AccountPage'
import React, { useEffect } from 'react'
import OrdersPage from './pages/OrdersPage'
import useLocalStorage from './hooks/useLocalStorage'
import Checkout from './pages/Checkout'
import HTTPClient from './utils/HTTPClient'

export const Context = React.createContext()

const PageRouter = (props) => {
    const [cart, setCart] = useLocalStorage('cart', [])
    const [user, setUser] = useLocalStorage('user', {})
    const [latLng, setLatLng] = useLocalStorage('latLng', { lat: -25.28646, lng: -57.647 })


    useEffect(()=> {
        if(user.logged){
            const {id} = user
            let client = new HTTPClient()

            client.setUserCart(cart, id)
                .then(res => {})
                .catch(err => {
                    console.log(err)
                })
        }
    }, [cart])
    return <BrowserRouter>
            <Context.Provider value={{
                cart: cart,
                setCart: setCart,
                user: user, 
                setUser: setUser, 
                latLng: latLng, 
                setLatLng: setLatLng
            }}>
                <Routes>
                    <Route index={true} path='/' element={<Home />}/>
                    <Route index={true} path='/login' element={<LoginPage />}/>
                    <Route index={true} path='/category/:category' element={<CategoryPage />}/>
                    <Route index={true} path='/cart/' element={<CartPage />}/>
                    <Route index={true} path='/category/:category/:product' element={<Detail />}/>
                    <Route index={true} path='/my-account' element={<AccountPage />}/>
                    <Route index={true} path='/checkout' element={<Checkout />}/>
                    <Route index={true} path='/my-account/orders' element={<OrdersPage />}/>
                </Routes>
            </Context.Provider>
        </BrowserRouter>
}
export default PageRouter