import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const SearchBar = ({ value, onChange, products }) => {

    const [query, setQuery] = useState(value);
    const [suggestions, setSuggestions] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);

    // Sync with parent
    useEffect(() => {
        setQuery(value);
    }, [value]);

    // Debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            onChange(query);
        }, 300);

        return () => clearTimeout(timer);
    }, [query, onChange]);

    // Suggestions
    useEffect(() => {
        if (query.trim() === "") {
            setSuggestions([]);
            return;
        }

        const filtered = products
            .filter((p) =>
                p.name.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 5);

        setSuggestions(filtered);
    }, [query, products]);

    // Reset active index
    useEffect(() => {
        setActiveIndex(-1);
    }, [query]);

    // Keyboard
    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
        }
        else if (e.key === "ArrowUp") {
            setActiveIndex((prev) => (prev <= 0 ? -1 : prev - 1));
        }
        else if (e.key === "Enter" && activeIndex >= 0) {
            setQuery(suggestions[activeIndex].name);
            setSuggestions([]);
        }
    };
    const wrapperRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setSuggestions([]);
                setActiveIndex(-1);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div className="pt-20 px-4 md:px-10 max-w-7xl mx-auto ">
            <div ref={wrapperRef} className="w-full bg-linear-to-b from-blue-400 to-purple-400 rounded-xl  mx-auto h-full relative py-2 px-2">
                <div className="group flex items-center max-w-3xl mx-auto backdrop-blur-lg border-3 border-white rounded-full shadow-xl px-5 py-3 hover:border-yellow-400 transition-all duration-300 hover:shadow-2xl w-full">
                    <FaSearch className="text-white mr-2 group-hover:text-yellow-400 hover:border-0 transition duration-300 " />

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full outline-none bg-transparent text-white placeholder-white/50"
                    />

                    {
                        query && (
                            <FaTimes
                                onClick={() => {
                                    setQuery("");
                                    setSuggestions([]);
                                }}
                                className="text-white cursor-pointer hover:text-red-500"
                            />
                        )
                    }

                </div>

                {
                    suggestions.length > 0 && (
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-3xl bg-blue-100 mt-3 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fadeIn">

                            {
                                suggestions.map((item, index) => (

                                    <div
                                        key={item.id}
                                        onClick={() => {
                                            setQuery(item.name);
                                            setSuggestions([]);
                                        }}
                                        className={`px-4 py-3 cursor-pointer flex items-center gap-3 transition-all duration-200 ${index === activeIndex
                                            ? "bg-blue-100 scale-[1.02]"
                                            : "hover:bg-blue-200 hover:scale-[1.01]"}`}
                                    >

                                        <img
                                            src={item.image}
                                            alt=""
                                            className="w-8 h-8 rounded object-cover"
                                        />

                                        <span>{item.name}</span>

                                    </div>

                                ))
                            }

                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default SearchBar;