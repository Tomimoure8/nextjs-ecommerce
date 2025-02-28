"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem("shoppingCart");
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("shoppingCart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const updateQuantity = (id, quantity) => {
        setCartItems((prevCart) =>
            prevCart.map(item =>
                item.id === id
                    ? {
                            ...item,
                            quantity: item.category === "notebooks"
                                ? Math.max(quantity, 1)
                                : item.category === "accessories"
                                ? Math.max(quantity, 1)
                                : item.category === "chargers"
                                ? Math.max(quantity, 1)
                                : Math.max(quantity, 1)
                        }
                    : item
            )
        );
    };

    const removeProduct = (id) => {
        setCartItems((prevCart) =>
            prevCart.filter(item => item.id !== id)
        );
    };

    return (
        <ShoppingCartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeProduct }}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

export const useShoppingCart = () => {
    return useContext(ShoppingCartContext);
};