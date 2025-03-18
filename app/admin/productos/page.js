"use client";

import { useEffect, useState } from "react";
import { getProductos, eliminarProducto } from "@/firebase/firestore";
import Link from "next/link";

export default function AdminProductos() {
    const [productos, setProductos] = useState([]);
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        async function fetchProductos() {
            const data = await getProductos();
            setProductos(data);
        }
        fetchProductos();
    }, []);

    // Profesores: Elimina un producto tras confirmación del usuario y actualiza el estado local
    const handleDelete = async (id) => {
        if (window.confirm("¿Seguro que quieres eliminar este producto?")) {
            try {
                await eliminarProducto(id);
                setProductos(prev => prev.filter(p => p.id !== id));
                setMensaje("Producto eliminado correctamente.");
            } catch (error) {
                setMensaje("Error al eliminar el producto.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8 max-w-full sm:max-w-5xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-pink-600 mb-4 sm:mb-6 text-center hover:text-pink-400 hover:shadow-[0_0_10px_rgba(255,105,180,0.8)] transition-all duration-300">
                🛍️ Administrar Productos
            </h2>

            {mensaje && (
                <p
                    className={`text-center mb-3 sm:mb-4 text-sm sm:text-base ${
                        mensaje.includes("correctamente") ? "text-green-500" : "text-red-500"
                    }`}
                >
                    {mensaje}
                </p>
            )}

            {/* Profesores: overflow-x-auto permite scroll horizontal en pantallas pequeñas */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="border border-gray-200 p-2 sm:p-3 text-left text-sm sm:text-base w-1/6">Imagen</th>
                            <th className="border border-gray-200 p-2 sm:p-3 text-left text-sm sm:text-base w-2/6">Nombre</th>
                            <th className="border border-gray-200 p-2 sm:p-3 text-left text-sm sm:text-base w-1/6">Precio</th>
                            <th className="border border-gray-200 p-2 sm:p-3 text-left text-sm sm:text-base w-1/6">Stock</th>
                            <th className="border border-gray-200 p-2 sm:p-3 text-left text-sm sm:text-base w-1/6">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(producto => (
                            <tr
                                key={producto.id}
                                className="text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <td className="border border-gray-200 p-2 sm:p-3 w-1/6">
                                    <img
                                        src={producto.imagen}
                                        alt={producto.nombre}
                                        className="h-12 sm:h-16 w-12 sm:w-16 object-cover rounded-md mx-auto"
                                    />
                                </td>
                                <td className="border border-gray-200 p-2 sm:p-3 text-sm sm:text-base w-2/6">{producto.nombre}</td>
                                <td className="border border-gray-200 p-2 sm:p-3 text-sm sm:text-base w-1/6">
                                    <span className="font-semibold text-pink-500">${producto.precio}</span>
                                </td>
                                <td className="border border-gray-200 p-2 sm:p-3 text-sm sm:text-base w-1/6">{producto.stock}</td>
                                <td className="border border-gray-200 p-2 sm:p-3 w-1/6 flex flex-col sm:flex-row gap-2">
                                    <Link
                                        href={`/admin/productos/editar/${producto.id}`}
                                        className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded-md hover:bg-blue-600 transition-shadow shadow-sm hover:shadow-md text-sm sm:text-base"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(producto.id)}
                                        className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-md hover:bg-red-600 transition-shadow shadow-sm hover:shadow-md text-sm sm:text-base"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 sm:mt-6 text-center">
                <Link
                    href="/admin/productos/agregar"
                    className="inline-block bg-yellow-400 text-gray-800 px-4 sm:px-6 py-2 rounded-full hover:bg-pink-400 hover:shadow-[0_0_10px_rgba(255,105,180,0.8)] transition-all duration-200 shadow-md active:scale-95 active:shadow-[0_0_15px_rgba(255,105,180,1)] active:bg-pink-500 active:text-white text-sm sm:text-base"
                >
                    ➕ Agregar Producto
                </Link>
            </div>
        </div>
    );
}