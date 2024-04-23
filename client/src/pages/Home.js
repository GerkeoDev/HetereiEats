
import ProductList from "../components/ProductList/ProductList"
import TopHeader from "../components/TopHeader/TopHeader"

const Home = () => {
    return <div>
        <TopHeader />
        <div className="">
            <div className="max-w-6xl mx-auto flex flex-col justify-between">
                <h1 className="text-3xl mb-4 text-center">You should try them!</h1>
                <h3 className="text-xl">Fast Food</h3>
                <ProductList  category="fast-food" />
                <h3 className="text-xl">Snacks</h3>
                <ProductList  category="snacks" />
                <h3 className="text-xl">Sandwiches</h3>
                <ProductList  category="sandwiches" />
                <h3 className="text-xl">Pasta</h3>
                <ProductList  category="pasta" />
                <h3 className="text-xl">Cakes</h3>
                <ProductList  category="cakes" />
                <h3 className="text-xl">Fit</h3>
                <ProductList  category="fit" />
            </div>
        </div>
        
    </div>
}
export default Home