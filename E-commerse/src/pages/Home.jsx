import React, { useContext, useState } from 'react'
import SearchBar from "../components/SearchBar";
import products from '../data/products'
import ProductCard from '../components/ProductCard'
import { CartContext } from '../context/CartContext'



const Home = () => {
    const [search, setSearch] = useState("");
    const groupedProducts = products.reduce((acc, product) => {

        if (!acc[product.category]) {
            acc[product.category] = [];
        }

        acc[product.category].push(product);

        return acc;

    }, {});

    const { addToCart } = useContext(CartContext);


    return (
            <div className="pt-24 px-4 md:px-10  max-w-7xl mx-auto">



                {
                    Object.keys(groupedProducts).map((category) => (

                        <section key={category} className="mb-14">

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">

                                {/* LEFT SIDE */}
                                <div className="flex items-center gap-2 sm:gap-3">

                                    {/* ICON */}
                                    <span className="text-lg sm:text-xl">
                                        📦
                                    </span>

                                    {/* TITLE */}
                                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 tracking-wide">
                                        {category}
                                    </h2>

                                </div>

                                {/* VIEW ALL BUTTON */}
                                <button className="text-sm sm:text-md text-blue-600 hover:underline self-start sm:self-auto">
                                    View All →
                                </button>

                            </div>

                            {/* LINE */}
                            <div className="w-full h-0.5 bg-linear-to-r from-blue-400 to-purple-300 mb-6 rounded-full"></div>

                            {/* CARD CONTAINER */}

                            <div className="bg-linear-to-b from-blue-400 to-purple-300 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-blue-500 ">

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                                    {
                                        groupedProducts[category].map((item) => (

                                            <ProductCard
                                                key={item.id}
                                                {...item}
                                                onAdd={() => addToCart(item)}
                                            />

                                        ))
                                    }

                                </div>

                            </div>

                        </section>

                    ))
                }

            </div>

    )
}

export default Home