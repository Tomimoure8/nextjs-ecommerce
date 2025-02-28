"use client";

import { useState } from "react";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import Swal from "sweetalert2";

const CartPage = () => {
    const { cartItems, updateQuantity, removeProduct } = useShoppingCart();
    const [shippingMethod, setShippingMethod] = useState("storePickup");
    const [shippingAddress, setShippingAddress] = useState("");
    const [customerName, setCustomerName] = useState("");

    const total = cartItems.reduce((acc, product) => acc + product.price * product.quantity, 0);
    const shippingCost = shippingMethod === "homeDelivery" ? 1500 : 0;

    const sendOrder = () => {
        if (shippingMethod === "homeDelivery" && !shippingAddress.trim()) {
            Swal.fire("Error", "Por favor, ingresa una dirección para la entrega a domicilio", "error");
            return;
        }
        if (shippingMethod === "storePickup" && !customerName.trim()) {
            Swal.fire("Error", "Por favor, ingresa tu nombre para recoger en tienda", "error");
            return;
        }

        let message = `Hola, quiero realizar un pedido:\n`;
        cartItems.forEach((product) => {
            message += `- ${product.name} x${product.quantity} - $${product.price * product.quantity}\n`;
        });
        message += `Total: $${total + shippingCost}\n`;
        message += shippingMethod === "homeDelivery" ? `Dirección de envío: ${shippingAddress}\n` : `Nombre: ${customerName}\n`;
        message += `Método de envío: ${shippingMethod === "homeDelivery" ? "Entrega a domicilio" : "Recogida en tienda"}`;
        
        const url = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    return (
        <div className="container mx-auto p-4 bg-gray-100">
            <h1 className="text-3xl font-bold mb-4 text-blue-700">Tu Carrito</h1>
            {cartItems.length === 0 ? (
                <p className="text-gray-500">No hay productos en el carrito.</p>
            ) : (
                <div className="bg-white shadow-md rounded-lg p-4">
                    <ul className="divide-y divide-gray-200">
                        {cartItems.map((product) => (
                            <li key={product.id} className="py-4 flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                                    <p className="text-gray-500">${product.price} x {product.quantity}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => updateQuantity(product.id, product.quantity - 1)} 
                                        disabled={product.quantity <= 1}
                                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 disabled:opacity-50"
                                    >
                                        ➖
                                    </button>
                                    <button 
                                        onClick={() => updateQuantity(product.id, product.quantity + 1)} 
                                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                                    >
                                        ➕
                                    </button>
                                    <button 
                                        onClick={() => removeProduct(product.id)} 
                                        className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-semibold text-gray-800">${product.price * product.quantity}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-4">
                        <h2 className="text-xl font-bold">Método de Envío</h2>
                        <select
                            className="w-full p-2 border rounded mt-2"
                            value={shippingMethod}
                            onChange={(e) => setShippingMethod(e.target.value)}
                        >
                            <option value="storePickup">Recogida en tienda</option>
                            <option value="homeDelivery">Entrega a domicilio (+$1500)</option>
                        </select>
                    </div>

                    {shippingMethod === "homeDelivery" ? (
                        <input
                            type="text"
                            placeholder="Ingresa tu dirección de envío"
                            className="w-full p-2 border rounded mt-2"
                            value={shippingAddress}
                            onChange={(e) => setShippingAddress(e.target.value)}
                        />
                    ) : (
                        <input
                            type="text"
                            placeholder="Ingresa tu nombre"
                            className="w-full p-2 border rounded mt-2"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                        />
                    )}

                    <div className="mt-4 text-right">
                        <button 
                            onClick={sendOrder} 
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
                        >
                            Enviar Pedido por WhatsApp
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;