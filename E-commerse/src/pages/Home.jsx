import React, { useContext, useState } from 'react'
import SearchBar from "../components/SearchBar";
import products from '../data/products'
import ProductCard from '../components/ProductCard'
import { CartContext } from '../context/CartContext'
import { GiElectric } from "react-icons/gi";
import { FaTshirt, FaDumbbell, FaCouch } from "react-icons/fa";
import { MdWatch } from "react-icons/md";

const categoryConfig = {
    Electronics: { icon: <GiElectric />, color: "text-yellow-500" },
    Fashion: { icon: <FaTshirt />, color: "text-pink-400" },
    Accessories: { icon: <MdWatch />, color: "text-blue-400" },
    Furniture: { icon: <FaCouch />, color: "text-orange-400" },
    Fitness: { icon: <FaDumbbell />, color: "text-green-400" }
};

const Home = ({ showToast }) => {

    const [search, setSearch] = useState("");
    const { addToCart } = useContext(CartContext);

    // FILTER PRODUCTS
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    // GROUP PRODUCTS
    const groupedProducts = filteredProducts.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {});

    return (
        <>
            <SearchBar
                value={search}
                onChange={setSearch}
                products={products}
            />

            <div className="pt-5 px-4 md:px-10 max-w-7xl mx-auto">

                {
                    Object.keys(groupedProducts).map((category) => (

                        <section key={category} className="mb-14">

                            {/* HEADER */}
                            <div className="flex justify-between items-center mb-4">

                                <div className="flex items-center justify-center gap-1">
                                    <span className={`text-2xl animate-bounce ${categoryConfig[category]?.color}`}>
                                        {categoryConfig[category]?.icon || <FaBoxOpen />}
                                    </span>
                                    <h2 className="text-xl font-bold text-gray-800">
                                        {category}
                                    </h2>
                                </div>

                                <button className="text-blue-600 hover:underline">
                                    View All →
                                </button>

                            </div>

                            {/* LINE */}
                            <div className="w-full h-0.5 bg-linear-to-r from-blue-400 to-purple-300 mb-6"></div>

                            {/* CARDS */}
                            <div className="bg-linear-to-b from-blue-300 to-purple-300 p-4 rounded-2xl">

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                                    {
                                        groupedProducts[category].map((item) => (

                                            <ProductCard
                                                key={item.id}
                                                {...item}
                                                onAdd={() => {
                                                    addToCart(item);
                                                    showToast(`${item.name} added to cart 🛒`);
                                                }}
                                            />

                                        ))
                                    }

                                </div>

                            </div>

                        </section>

                    ))
                }

            </div>
        </>
    )
}

export default Home;