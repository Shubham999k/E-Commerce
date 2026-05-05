import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const Toast = ({ message, show }) => {
    return (
        <div
            className={`fixed top-20 lg:right-2 md:right-2 sm:right-0 z-50 transition-all duration-700
            ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}`}
        >
            <div className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2">
                {/* ICON HERE */}
                <FaCheckCircle />

                {/* MESSAGE */}
                <span>{message}</span>

            </div>
        </div>
    );
};

export default Toast;