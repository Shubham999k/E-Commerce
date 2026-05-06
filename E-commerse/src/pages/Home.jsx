import React, { useContext, useState, useMemo, useEffect } from 'react'
import SearchBar from "../components/SearchBar";
import products from '../data/products'
import ProductCard from '../components/ProductCard'
import { CartContext } from '../context/CartContext'

import { GiElectric } from "react-icons/gi";
import { FaBoxOpen, FaTshirt, FaDumbbell, FaCouch } from "react-icons/fa";
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
    const [query, setQuery] = useState("");

    const { addToCart } = useContext(CartContext);

    // 🔥 Debounce search
    useEffect(() => {
        const t = setTimeout(() => setSearch(query), 300);
        return () => clearTimeout(t);
    }, [query]);

    // 🔥 Optimized filter
    const filteredProducts = useMemo(() => {
        return products.filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    // 🔥 Optimized grouping
    const groupedProducts = useMemo(() => {
        return filteredProducts.reduce((acc, product) => {
            if (!acc[product.category]) acc[product.category] = [];
            acc[product.category].push(product);
            return acc;
        }, {});
    }, [filteredProducts]);

    return (
        <>
            <SearchBar
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                products={products}
            />

            <div className="pt-5 px-4 md:px-10 max-w-7xl mx-auto">

                {
                    Object.keys(groupedProducts).map((category) => (

                        <section key={category} className="mb-14">

                            {/* HEADER */}
                            <div className="flex justify-between items-center mb-4">

                                <div className="flex items-center gap-2">

                                    <span className={`text-2xl ${categoryConfig[category]?.color} transition hover:scale-110`}>
                                        {categoryConfig[category]?.icon || <FaBoxOpen />}
                                    </span>

                                    <h2 className="text-2xl font-bold flex gap-px text-gray-800">

                                        {
                                            category.split("").map((letter, index) => (

                                                <span
                                                    key={index}
                                                    className="inline-block transition duration-300 hover:-translate-y-1"
                                                    onMouseEnter={(e) => {
                                                        e.target.style.color = [
                                                            "#f59e0b",
                                                            "#3b82f6",
                                                            "#ef4444",
                                                            "#8b5cf6",
                                                            "#ec4899",
                                                        ][index % 5];
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.color = "#1f2937";
                                                    }}
                                                >
                                                    {letter === " " ? "\u00A0" : letter}
                                                </span>

                                            ))
                                        }

                                    </h2>
                                </div>

                                <button className="text-blue-600 hover:underline">
                                    View All →
                                </button>

                            </div>

                            {/* LINE */}
                            <div className="w-full h-0.5 bg-linear-to-r from-blue-400 to-purple-300 mb-6"></div>

                            {/* CARDS */}
                            <div className="bg-linear-to-b from-blue-200 to-purple-200 p-4 rounded-2xl">

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                                    {
                                        groupedProducts[category].map((item) => (

                                            <ProductCard
                                                key={item.id}
                                                name={item.name}
                                                price={item.price}
                                                image={item.image}
                                                rating={item.rating}
                                                category={item.category}
                                                stock={item.stock}   // ✅ THIS WAS MISSING
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
        </>
    )
}

export default Home;