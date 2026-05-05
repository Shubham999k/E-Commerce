import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {

    return (
        <footer className="bg-black text-white text-center">

            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* BRAND */}
                <div>
                    <h1 className="text-2xl font-bold text-green-400 mb-3">
                        E-Shop
                    </h1>

                    <p className="text-gray-400 text-sm leading-6">
                        Discover amazing products with the best deals. 
                        Built with React & Tailwind for a smooth shopping experience.
                    </p>
                </div>

                {/* QUICK LINKS */}
                <div>
                    <h2 className="text-lg font-semibold mb-3">
                        Quick Links
                    </h2>

                    <ul className="flex gap-3 justify-center space-y-2 text-gray-400">

                        <li className="hover:text-green-400 cursor-pointer transition">
                            Home
                        </li>

                        <li className="hover:text-green-400 cursor-pointer transition">
                            Shop
                        </li>

                        <li className="hover:text-green-400 cursor-pointer transition">
                            Cart
                        </li>

                        <li className="hover:text-green-400 cursor-pointer transition">
                            Contact
                        </li>

                    </ul>
                </div>

                {/* SOCIAL */}
                <div>
                    <h2 className="text-lg font-semibold mb-3">
                        Follow Us
                    </h2>

                    <div className="flex flex-wrap justify-center gap-4 text-2xl sm:text-3xl">

                        <FaFacebook className="hover:text-blue-500 cursor-pointer transition hover:scale-110" />
                        <FaInstagram className="hover:text-pink-500 cursor-pointer transition hover:scale-110" />
                        <FaTwitter className="hover:text-sky-400 cursor-pointer transition hover:scale-110" />
                        <FaGithub className="hover:text-green-400 cursor-pointer transition hover:scale-110" />

                    </div>

                </div>

            </div>

            {/* BOTTOM */}
            <div className="border-t border-gray-700 text-center py-4 text-gray-500 text-sm">

                © 2026 E-Shop. All rights reserved.

            </div>

        </footer>
    )
}

export default Footer