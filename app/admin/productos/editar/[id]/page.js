"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProductoById, editarProducto } from "@/firebase/firestore";

export default function EditarProductoPage() {
    const { id } = useParams();
    const router = useRouter();

    const [producto, setProducto] = useState(null);
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        async function fetchProducto() {
            const prod = await getProductoById(id);
            if (prod) {
                setProducto(prod);
            } else {
                setMensaje("No se encontró el producto.");
            }
        }
        if (id) {
            fetchProducto();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!producto) return;

        try {
            await editarProducto(id, {
                nombre: producto.nombre,
                precio: +producto.precio,
                stock: +producto.stock,
                imagen: producto.imagen || "",
            });
            setMensaje("Producto actualizado con éxito.");
            setTimeout(() => router.push("/admin/productos"), 1500); // Redirige tras 1.5s para mostrar mensaje
        } catch (error) {
            setMensaje("Error al actualizar producto: " + error.message);
        }
    };

    if (mensaje === "No se encontró el producto.") {
        return <p className="text-center text-red-500 py-6">{mensaje}</p>;
    }

    if (!producto) {
        return <p className="text-center text-blue-500 font-semibold animate-pulse py-6">Cargando producto...</p>;
    }

    return (
        <div className="min-h-screen bg-white p-6 max-w-lg mx-auto">
            <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">✏️ Editar Producto</h2>

            {mensaje && (
                <p
                    className={`text-center mb-4 ${
                        mensaje.includes("éxito") ? "text-green-500" : "text-red-500"
                    }`}
                >
                    {mensaje}
                </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block font-semibold text-gray-700 mb-1">Nombre:</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                        value={producto.nombre}
                        onChange={(e) => setProducto({ ...producto, nombre: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold text-gray-700 mb-1">Precio:</label>
                    <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                        value={producto.precio}
                        onChange={(e) => setProducto({ ...producto, precio: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold text-gray-700 mb-1">Stock:</label>
                    <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                        value={producto.stock}
                        onChange={(e) => setProducto({ ...producto, stock: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold text-gray-700 mb-1">URL de Imagen:</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                        value={producto.imagen || ""}
                        onChange={(e) => setProducto({ ...producto, imagen: e.target.value })}
                    />
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-shadow shadow-md hover:shadow-lg"
                    >
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
    );
}