"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // Profesores: Incrementa cantidad si el producto ya existe, sino lo agrega
    function addToCart(producto) {
        setCart((prevCart) => {
            const productoExistente = prevCart.find((item) => item.id === producto.id);
            if (productoExistente) {
                return prevCart.map((item) =>
                    item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            }
            return [...prevCart, { ...producto, cantidad: 1 }];
        });
    }

    function removeFromCart(id) {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    }

    function clearCart() {
        setCart([]);
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}
