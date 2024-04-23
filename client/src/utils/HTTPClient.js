import axios from "axios"

class HTTPClient {
    constructor(){
        this.instance = axios.create({
            baseURL: "http://localhost:8000/api/",
            withCredentials: true,
        })
    }

    login(email, password){
        return this.instance.post("/login", {
            email,
            password
        })
    }

    register(data){
        return this.instance.post("/register", data)
    }

    logout(){
        return this.instance.post("/logout")
    }

    getProducts(){
        return this.instance.get("/products/")
    }
    
    getProduct(id){
        return this.instance.get(`/product/${id}`)
    }

    getProductsByCategory(category){
        return this.instance.get(`/products/category/${category}`)
    }

    getProductsByName(name){
        return this.instance.get(`/product/name/${name}`)
    }

    getCart(id){
        return this.instance.get(`/cart/${id}`)
    }

    getOrders(id){
        return this.instance.get(`/orders/${id}`)
    }

    setUserCart(cart, id){
        return this.instance.put(`/cart/${id}`, cart)
    }

    setUserOrders(orders, id){
        return this.instance.put(`/orders/${id}`, orders)
    }

    payment(id, amount, description){
        return this.instance.post("/payment", {id, amount: amount * 100, description: description})
    }
    
}

export default HTTPClient;