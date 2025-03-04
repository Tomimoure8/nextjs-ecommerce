"use client"

import { useShoppingCart } from "../../src/context/ShoppingCartContext";
import PropTypes from 'prop-types';
import Button from "./Button";

export default function AddToCartButton({ product }) {
    const { addToCart } = useShoppingCart ();

    const handleClick = () => {
        addToCart(product);
    }

    return (
        <Button onClick={handleClick} aria-label={`Agregar ${product.name} al carrito`}>
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
        category: PropTypes.string.isRequired,
    }).isRequired,
};
