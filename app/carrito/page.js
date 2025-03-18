"use client";

import { useCart } from "../../src/context/CartContext";

export default function CarritoPage() {
    const { cart, removeFromCart, clearCart } = useCart();

    return (
        <div>
            <h1>🛒 Carrito de Compras</h1>
            {cart.length === 0 ? (
                <p>Tu carrito está vacío</p>
            ) : (
                <div>
                    <ul>
                        {cart.map((producto) => (
                            <li key={producto.id}>
                                <p>{producto.nombre} - ${producto.precio} x {producto.cantidad}</p>
                                <button onClick={() => removeFromCart(producto.id)}>❌ Eliminar</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={clearCart}>🗑 Vaciar Carrito</button>
                </div>
            )}
        </div>
    );
}
