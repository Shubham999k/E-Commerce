import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom'

const Navbar = () => {

    const { cart } = useContext(CartContext);

    return (
        <div className='flex justify-between items-center px-8 py-4 
        bg-black/90 backdrop-blur-md text-white 
        fixed top-0 left-0 w-full z-50 shadow-md'>

            {/* Logo */}
            <Link to="/">
                <h1 className='text-2xl font-bold tracking-wide'>
                    E-Shop
                </h1>
            </Link>

            {/* Cart */}
            <Link
                to="/cart"
                className="relative text-2xl hover:scale-110 transition duration-300"
            >

                <FaShoppingCart />

                {/* Badge */}
                <span
                    className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full shadow-md"
                >
                    {
                        cart.reduce((total, item) => total + (item.quantity ?? 1), 0)
                    }
                </span>

            </Link>

        </div>
    )
}

export default Navbar