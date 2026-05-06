import React from "react";
import formatPrice from "../utils/formatPrice";
import { IoStar } from "react-icons/io5";

const ProductCard = ({ name, price, image, rating, category, stock, onAdd }) => {

    return (
        <div
            className="bg-white rounded-2xl shadow-md overflow-hidden 
            hover:shadow-xl transition duration-300 flex flex-col 
            hover:scale-105"
        >

            {/* Image */}
            <div className="h-40 overflow-hidden relative">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />

                {/* Low Stock Badge */}
                {stock <= 5 && stock > 0 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        Low Stock
                    </span>
                )}
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
                    <p className="text-yellow-500 text-md flex items-center gap-1">
                        <IoStar /> {rating}
                    </p>

                    {/* Stock */}
                    <p className={`text-sm font-medium mb-1 ${stock <= 5 ? "text-red-500" : "text-gray-600"
                        }`}>
                        {stock === 0
                            ? "Out of Stock ❌"
                            : stock <= 5
                                ? `Only ${stock} left ⚠️`
                                : `In Stock (${stock})`
                        }
                    </p>

                    {/* Price */}
                    <p className="text-green-600 text-xl font-bold mb-3">
                        ₹ {formatPrice(price)}
                    </p>

                    {/* Button */}
                    <button
                        onClick={onAdd}
                        disabled={stock === 0}
                        className={`w-full py-2 rounded-xl font-semibold transition-all duration-300 
                        ${stock === 0
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-linear-to-r from-purple-400 to-sky-400 text-black hover:from-sky-400 hover:to-purple-400"
                            }`}
                    >
                        {stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ProductCard;