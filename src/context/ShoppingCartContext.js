"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        if (typeof window !== "undefined") {
            return JSON.parse(localStorage.getItem("shoppingCart")) || [];
        }
        return [];
    });

    useEffect(() => {
        const handler = setTimeout(() => {
            localStorage.setItem("shoppingCart", JSON.stringify(cartItems));
        }, 500); // Agregamos un pequeño debounce para evitar escrituras constantes

        return () => clearTimeout(handler);
    }, [cartItems]);

    return (
        <ShoppingCartContext.Provider value={{ cartItems, setCartItems }}>
            {children}
        </ShoppingCartContext.Provider>
    );
};