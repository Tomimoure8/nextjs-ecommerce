"use client"

import { useContext } from "react";
import PropTypes from 'prop-types';
import Button from "./Button";
import { CartContext } from "@/providers/CartProvider";

export default function AddToCartButton({ producto }) {

    const { handleAddToCart } = useContext(CartContext);

    const handleClick = () => {
        handleAddToCart(producto);
    }

    return (
        <Button onClick={handleClick} aria-label={`Agregar ${producto.name} al carrito`}>
            Agregar al carrito
        </Button>
    );
}

AddToCartButton.propTypes = {
    producto: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string,
    }).isRequired,
};
