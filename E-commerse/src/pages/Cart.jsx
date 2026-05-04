import React, { useContext } from 'react'
import formatPrice from "../utils/formatPrice";
import { CartContext } from '../context/CartContext'
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

const Cart = () => {

    const { cart, removeFromCart, increaseQty, decreaseQty, total } = useContext(CartContext);

    return (
        <div className='min-h-screen bg-linear-to-b from-gray-100 to-gray-200 pt-24 px-4 md:px-10'>

            <h1 className='text-3xl font-bold mb-8 text-center tracking-wide'>
                🛒 Your Cart
            </h1>

            {/* EMPTY STATE */}
            {
                cart.length === 0 && (
                    <p className='text-center text-gray-500 text-lg'>
                        Your cart is empty 😔
                    </p>
                )
            }

            <div className='max-w-5xl mx-auto grid md:grid-cols-3 gap-6 '>

                {/* ITEMS */}
                <div className='md:col-span-2 space-y-4 '>

                    {
                        cart.map((item) => (

                            <div
                                key={item.id}
                                className='flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl shadow-sm 
                                hover:shadow-lg transition-all duration-300 ease-in-out'
                            >

                                {/* IMAGE */}
                                <img
                                    src={item.image}
                                    alt=""
                                    className='w-full sm:w-24 h-32 sm:h-24 object-cover rounded-xl'
                                />

                                {/* DETAILS */}
                                <div className='grow text-center sm:text-left'>
                                    <h2 className='font-semibold text-lg'>
                                        {item.name}
                                    </h2>

                                    <p className='text-green-600 font-bold'>
                                        ₹ {formatPrice(item.price)}
                                    </p>

                                    <p className='text-sm text-gray-500'>
                                        Subtotal: ₹ {formatPrice(item.price * item.quantity)}
                                    </p>
                                </div>

                                {/* QUANTITY */}
                                <div className='flex items-center gap-3'>

                                    <button
                                        onClick={() => decreaseQty(item.id)}
                                        disabled={item.quantity === 1}
                                        className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200
                                        ${item.quantity === 1
                                                ? 'bg-red-500 text-white cursor-not-allowed '
                                                : 'bg-gray-200 hover:bg-red-500 hover:text-white hover:scale-110 active:scale-95'}`}
                                    >
                                        <FaMinus size={12} />
                                    </button>

                                    <span className='font-bold text-lg w-6 text-center'>
                                        {item.quantity}
                                    </span>

                                    <button
                                        onClick={() => increaseQty(item.id)}
                                        className='w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 
                                        hover:bg-green-500 hover:scale-110 active:scale-95 transition-all duration-200 hover:text-white'
                                    >
                                        <FaPlus size={12} />
                                    </button>

                                </div>

                                {/* REMOVE */}
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className='text-red-500 hover:text-red-600 hover:scale-125 transition-all duration-200'
                                >
                                    <FaTrash size={18} />
                                </button>

                            </div>

                        ))
                    }

                </div>

                {/* SUMMARY */}
                {
                    cart.length > 0 && (
                        <div className='bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl 
        h-fit sticky top-28 transition-all duration-300 border border-gray-200'>

                            {/* HEADER */}
                            <h2 className='text-xl font-bold mb-5 text-gray-800 tracking-wide'>
                                🧾 Order Summary
                            </h2>

                            {/* ITEMS COUNT */}
                            <div className='flex justify-between text-gray-600 mb-3'>
                                <span>Items</span>
                                <span  className='text-black font-bold'>
                                    {
                                        cart.reduce((sum, item) => sum + item.quantity, 0)
                                    }
                                </span>
                            </div>

                            {/* SUBTOTAL */}
                            <div className='flex justify-between text-gray-600 mb-3'>
                                <span>sub-total</span>
                                <span className='text-blue-800 font-bold'>₹ {formatPrice(total)}</span>
                            </div>

                            {/* DELIVERY */}
                            <div className='flex justify-between text-gray-600 mb-3'>
                                <span>Delivery</span>
                                <span className='text-green-500'>Free</span>
                            </div>

                            {/* DIVIDER */}
                            <div className='border-t my-4'></div>

                            {/* TOTAL */}
                            <div className='flex justify-between text-lg font-bold text-gray-800 mb-5'>
                                <span>Total</span>
                                <span>₹ {formatPrice(total)}</span>
                            </div>

                            {/* BUTTON */}
                            <button
                                className='w-full bg-linear-to-r from-green-500 to-emerald-600  text-white py-3 rounded-xl font-semibold hover:scale-105 active:scale-95 transition-all duration-300 shadow-md'
                            >
                                Proceed to Checkout 
                            </button>

                        </div>
                    )
                }

            </div>

        </div>
    )
}

export default Cart