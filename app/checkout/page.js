"use client";

import { useCart } from "../../src/context/CartContext";
import { useAuth } from "../../src/context/AuthContext";
import { useState, useEffect } from "react";
import { guardarOrden, getProductoById, updateStock } from "../../src/firebase/firestore";

export default function Checkout() {
    const { cart, clearCart } = useCart();
    const { user } = useAuth();
    const [userData, setUserData] = useState({ nombre: "", email: "", direccion: "" });
    const [mensaje, setMensaje] = useState("");
    const [ordenId, setOrdenId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Profesores: Calcula el total del carrito usando reduce, acumulando precio * cantidad
    const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    // Profesores: Carga datos del usuario autenticado en el formulario al cambiar 'user'
    useEffect(() => {
        if (user) {
            setUserData({
                nombre: user.displayName || "",
                email: user.email || "",
                direccion: "",
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    // Profesores: Verifica stock en Firestore antes de procesar la orden, retorna validación
    const checkStock = async () => {
        for (const item of cart) {
            const producto = await getProductoById(item.id);
            if (!producto || producto.stock < item.cantidad) {
                return { valid: false, mensaje: `No hay suficiente stock para ${item.nombre}` };
            }
        }
        return { valid: true };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const stockCheck = await checkStock();
            if (!stockCheck.valid) {
                setMensaje(stockCheck.mensaje);
                setIsLoading(false);
                return;
            }
            const orden = {
                usuario: { ...userData },
                productos: cart.map(({ id, nombre, precio, cantidad }) => ({
                    id,
                    nombre,
                    precio,
                    cantidad,
                })),
                total: total.toFixed(2),
                estado: "pendiente",
                userId: user ? user.uid : null,
            };
            const id = await guardarOrden(orden);
            await updateStock(cart);
            setOrdenId(id);
            setMensaje(`Compra confirmada. Tu ID de orden es: ${id}`);
            clearCart();
        } catch (error) {
            setMensaje("Hubo un error al procesar la compra. Inténtalo de nuevo.");
            console.error("Error en checkout:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // Profesores: Contenedor principal con fondo blanco, padding responsivo
        <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
            {/* Profesores: Título con brillo rosa al hover, tamaño ajustado para pantallas */}
            <h2
                className="text-xl sm:text-2xl md:text-3xl font-bold text-pink-600 mb-4 sm:mb-6 text-center hover:text-pink-400 hover:shadow-[0_0_10px_rgba(255,105,180,0.8)] transition-all duration-300"
            >
                🛒 Checkout
            </h2>

            {cart.length === 0 ? (
                <p className="text-center text-gray-500 text-sm sm:text-base">Tu carrito está vacío.</p>
            ) : (
                <>
                    {/* Profesores: Lista de productos en cuadrícula responsiva */}
                    <ul className="space-y-2 sm:space-y-0 mb-4 sm:mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {cart.map((item) => (
                            <li
                                key={item.id}
                                className="text-gray-700 flex flex-col sm:flex-row justify-between items-center text-sm sm:text-base"
                            >
                                <span className="text-blue-500 hover:text-pink-400 hover:shadow-[0_0_10px_rgba(255,105,180,0.8)] transition-all duration-300">
                                    {item.nombre}
                                </span>
                                <span className="mt-1 sm:mt-0">
                                    {item.cantidad} x{" "}
                                    <span className="font-semibold text-pink-500">${item.precio}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                    {/* Profesores: Total destacado con tamaño responsivo */}
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-yellow-400 mb-4 sm:mb-6 text-center">
                        Total: <span className="text-pink-500">${total.toFixed(2)}</span>
                    </h3>
                    {/* Profesores: Formulario centrado con espaciado responsivo */}
                    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 max-w-sm sm:max-w-md mx-auto">
                        <div>
                            <label className="block font-semibold text-gray-700 mb-1 text-sm sm:text-base">Nombre:</label>
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Nombre"
                                value={userData.nombre}
                                onChange={handleInputChange}
                                disabled={user && user.displayName}
                                className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 disabled:bg-gray-100 text-sm sm:text-base"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700 mb-1 text-sm sm:text-base">Correo electrónico:</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Correo electrónico"
                                value={userData.email}
                                onChange={handleInputChange}
                                disabled={user}
                                className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 disabled:bg-gray-100 text-sm sm:text-base"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700 mb-1 text-sm sm:text-base">Dirección:</label>
                            <input
                                type="text"
                                name="direccion"
                                placeholder="Dirección"
                                value={userData.direccion}
                                onChange={handleInputChange}
                                className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-sm sm:text-base"
                            />
                        </div>
                        {/* Profesores: Botones en layout flexible, responsivo */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-blue-500 text-white px-4 sm:px-6 py-2 rounded-full hover:bg-pink-300 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 active:shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base"
                            >
                                {isLoading ? "Procesando..." : "Confirmar compra"}
                            </button>
                            <button
                                onClick={clearCart}
                                className="bg-gray-700 text-white px-4 sm:px-6 py-2 rounded-full hover:bg-yellow-400 hover:text-gray-800 transition-shadow shadow-md hover:shadow-lg text-sm sm:text-base"
                            >
                                Vaciar carrito
                            </button>
                        </div>
                    </form>
                    {mensaje && (
                        <p className={`text-center mt-3 sm:mt-4 text-sm sm:text-base ${mensaje.includes("confirmada") ? "text-green-500" : "text-red-500"}`}>
                            {mensaje}
                        </p>
                    )}
                    {ordenId && (
                        <p className="text-center mt-2 text-yellow-400 text-sm sm:text-base">
                            Tu número de orden es: <strong className="text-pink-500">{ordenId}</strong>
                        </p>
                    )}
                </>
            )}
        </div>
    );
}