import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children, showToast }) => {

    const [cart, setCart] = useState([]);

    // ✅ ADD TO CART
    const addToCart = (product) => {

        setCart((prev) => {

            const existing = prev.find(item => item.id === product.id);

            // ❌ STOCK LIMIT
            if (existing && existing.quantity >= product.stock) {
                showToast && showToast(
                    `${product.name} stock limit reached 🚫`,
                    "error"
                );
                return prev;
            }

            // ✅ IF ALREADY EXISTS → INCREASE
            if (existing) {

                const newQty = existing.quantity + 1;

                showToast && showToast(
                    `${product.name} quantity updated → ${newQty} 🔄`,
                    "success"
                );

                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: newQty }
                        : item
                );
            }

            // ✅ FIRST TIME ADD
            showToast && showToast(
                `${product.name} added to cart 🛒`,
                "success"
            );

            return [...prev, { ...product, quantity: 1 }];
        });
    };

    // ✅ INCREASE QTY
    const increaseQty = (id) => {
        setCart((prev) =>
            prev.map((item) => {

                if (item.id !== id) return item;

                // ❌ Prevent exceeding stock
                if (item.quantity >= item.stock) {
                    showToast && showToast(
                        `${item.name} stock limit reached 🚫`,
                        "error"
                    );
                    return item;
                }

                const newQty = item.quantity + 1;

                showToast && showToast(
                    `${item.name} (x${newQty}) added to cart 🛒`,
                    "success"
                );

                return { ...item, quantity: newQty };
            })
        );
    };

    // ✅ DECREASE QTY
    const decreaseQty = (id) => {
        setCart((prev) =>
            prev
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    // ✅ REMOVE
    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    // ✅ TOTAL
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                increaseQty,
                decreaseQty,
                removeFromCart,
                total
            }}
        >
            {children}
        </CartContext.Provider>
    );
};