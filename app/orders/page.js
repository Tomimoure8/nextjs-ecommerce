"use client";

import { useAuth } from "../../src/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getOrdenesByUser } from "../../src/firebase/firestore";

export default function OrdersPage() {
    const { user, role } = useAuth();
    const router = useRouter();
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Profesores: useEffect maneja autenticación, redirección y carga de órdenes
    useEffect(() => {
        if (!user) {
            router.push("/login");
            return;
        }

        if (role === "admin") {
            router.push("/admin/orders");
            return;
        }

        async function fetchOrdenes() {
            try {
                const data = await getOrdenesByUser(user.uid);
                setOrdenes(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchOrdenes();
    }, [user, role, router]);

    // Profesores: Mensajes de redirección para estados intermedios
    if (!user) {
        return <p className="text-center text-gray-600 py-4 sm:py-6 text-sm sm:text-base">Redirigiendo al login...</p>;
    }

    if (role === "admin") {
        return <p className="text-center text-gray-600 py-4 sm:py-6 text-sm sm:text-base">Redirigiendo a órdenes de admin...</p>;
    }

    // Profesores: Indicador de carga animado mientras se obtienen datos
    if (loading) {
        return <p className="text-center text-blue-500 font-semibold animate-pulse py-4 sm:py-6 text-sm sm:text-base">Cargando órdenes...</p>;
    }

    return (
        // Profesores: Contenedor principal con ancho máximo responsivo y padding ajustado
        <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8 max-w-full sm:max-w-4xl mx-auto">
            {/* Profesores: Título con brillo rosa al hover, tamaño escalado */}
            <h2
                className="text-xl sm:text-2xl md:text-3xl font-bold text-pink-600 mb-4 sm:mb-6 text-center hover:text-pink-400 hover:shadow-[0_0_10px_rgba(255,105,180,0.8)] transition-all duration-300"
            >
                📦 Mis Órdenes
            </h2>
            {ordenes.length === 0 ? (
                <p className="text-center text-gray-500 text-sm sm:text-base">No tienes órdenes aún.</p>
            ) : (
                // Profesores: Lista de órdenes con espaciado responsivo
                <ul className="space-y-4 sm:space-y-6">
                    {ordenes.map((orden) => (
                        // Profesores: Tarjeta de orden con sombra dinámica
                        <li
                            key={orden.id}
                            className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 shadow-md hover:shadow-lg transition-shadow"
                        >
                            <p className="text-gray-700 text-sm sm:text-base">
                                <strong className="text-blue-500">ID de Orden:</strong> {orden.id}
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base">
                                <strong className="text-blue-500">Total:</strong>{" "}
                                <span className="font-semibold text-pink-500">${orden.total}</span>
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base">
                                <strong className="text-blue-500">Estado:</strong>{" "}
                                <span
                                    className={`inline-block px-2 py-1 rounded-full text-white text-xs sm:text-sm ${
                                        orden.estado === "pendiente"
                                            ? "bg-yellow-400"
                                            : orden.estado === "completada"
                                            ? "bg-green-500"
                                            : "bg-gray-400"
                                    }`}
                                >
                                    {orden.estado}
                                </span>
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base">
                                <strong className="text-blue-500">Fecha:</strong>{" "}
                                {orden.fecha ? new Date(orden.fecha.toDate()).toLocaleString() : "Pendiente"}
                            </p>
                            <p className="text-gray-700 mt-2 text-sm sm:text-base">
                                <strong className="text-blue-500">Productos:</strong>
                            </p>
                            {/* Profesores: Lista de productos con márgenes ajustados */}
                            <ul className="ml-3 sm:ml-4 list-disc text-gray-700 text-xs sm:text-sm">
                                {orden.productos.map((producto, index) => (
                                    <li key={index}>
                                        <span className="text-blue-500">{producto.nombre}</span> -{" "}
                                        {producto.cantidad} x{" "}
                                        <span className="font-semibold text-pink-500">${producto.precio}</span>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}