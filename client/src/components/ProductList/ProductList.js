import { useEffect, useState } from "react"
import HTTPClient from "../../utils/HTTPClient"
import ProductCard from "../ProductCard/ProductCard"

const ProductList = ({category, results}) => {
    const [products, setProducts] = useState([])
    const [loaded, setLoaded] = useState(false)
    useEffect(()=>{
        let client = new HTTPClient()
        client.getProductsByCategory(category)
            .then(res => {
                setProducts(res.data)
                if(results){
                    results(res.data.length)
                }
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [category])
    return <div className="flex flex-wrap">
        {loaded && products.map((product, idx) => {
            return <div key={idx} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
                    <ProductCard product={product} />
                </div>
        })}
    </div>
}
export default ProductList