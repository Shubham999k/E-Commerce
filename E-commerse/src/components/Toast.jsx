import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const Toast = ({ message, show, type }) => {

    const isError = type === "error";
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (show) {
            setProgress(100);

            const interval = setInterval(() => {
                setProgress((prev) => prev - 2);
            }, 60);

            return () => clearInterval(interval);
        }
    }, [show]);

    return (
        <div
            className={`fixed z-50 transition-all duration-500
            ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}
            
            ${isError
                    ? "top-8 left-1/2 -translate-y-1/2 text-center"   // 🔴 CENTER
                    : "top-8 right-5"                     // 🟢 RIGHT
                }
            `}
        >

            <div className={`relative overflow-hidden flex items-center gap-3 px-6 py-3 rounded-xl shadow-xl text-white
                backdrop-blur-md
                ${isError ? "bg-red-500/90" : "bg-green-500/90"}
            `}>

                {/* ICON */}
                {isError ? <FaExclamationCircle /> : <FaCheckCircle />}

                {/* TEXT */}
                <span className="font-medium">{message}</span>

                {/* PROGRESS BAR */}
                <div
                    className="absolute bottom-0 left-0 h-1 bg-white/70 transition-all"
                    style={{ width: `${progress}%` }}
                ></div>

            </div>
        </div>
    );
};

export default Toast;