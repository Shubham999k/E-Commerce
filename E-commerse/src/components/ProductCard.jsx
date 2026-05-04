import React from "react";
import formatPrice from "../utils/formatPrice";

const ProductCard = ({ name, price, image, rating, category, onAdd }) => {

    const text = "Add to Cart";

    return (
        <div
            className="bg-white rounded-2xl shadow-md overflow-hidden 
            hover:shadow-xl transition duration-300 flex flex-col 
            hover:scale-105 "
        >

            {/* Image */}
            <div className="h-40 overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col grow">

                {/* Category */}
                <span className="text-xs text-gray-500 mb-1">
                    {category}
                </span>

                {/* Name */}
                <h2 className="text-lg font-semibold text-gray-800">
                    {name}
                </h2>

                {/* Bottom Section */}
                <div className="mt-auto">
                    {/* Rating */}
                    <p className="text-yellow-500 text-md">
                        ⭐ {rating}
                    </p>

                    {/* Price */}
                    <p className="text-green-600 text-xl font-bold mb-3">
                        ₹ {formatPrice(price)}
                    </p>

                    {/* Button */}
                    <button
                        onClick={onAdd}
                        className="w-full bg-linear-to-r from-blue-400 to-sky-500 
                        py-2 rounded-xl font-bold flex flex-wrap justify-center text-black text-sm sm:text-base"
                    >
                        {
                            text.split("").map((letter, index) => (
                                <span
                                    key={index}
                                    className="inline-block hover:scale-120 hover:-translate-y-1 transition duration-500"
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
                                        e.target.style.color = "black";
                                    }}
                                >
                                    {letter === " " ? "\u00A0" : letter}
                                </span>
                            ))
                        }
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ProductCard;