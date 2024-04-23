import { useParams} from "react-router-dom";
import ProductList from "../components/ProductList/ProductList";
import { useState } from "react";
import TopHeader from "../components/TopHeader/TopHeader";

const CategoryPage = () => {
    const { category } = useParams();
    const [results, setResults] = useState(0)
    return <div>
        <TopHeader />
        <div className="">
            <div className="max-w-6xl mx-auto flex flex-col justify-between">
                <p>Home/{category}</p>
                <p className="text-xl">Showing all {results} results</p>
                <ProductList category={category} results={setResults}/>
            </div>
        </div>
    </div>
}
export default CategoryPage