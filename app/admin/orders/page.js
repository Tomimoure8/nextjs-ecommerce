"use client";

import { useAuth } from "../../../src/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../src/firebase/firebaseConfig";

export default function AdminOrdersPage() {
    const { user, role } = useAuth();
    const router = useRouter();
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Profesores: Carga todas las órdenes para admins, redirige si no está autenticado o no es admin
    useEffect(() => {
        if (!user || role !== "admin") {
            router.push("/login");
            return;
        }

        async function fetchAllOrdenes() {
            try {
                const querySnapshot = await getDocs(collection(db, "ordenes"));
                const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setOrdenes(data);
            } catch (error) {
                console.error("Error fetching all orders:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchAllOrdenes();
    }, [user, role, router]);

    // Profesores: Mensaje de redirección si no hay permisos
    if (!user || role !== "admin") {
        return <p className="text-center text-gray-600 py-4 sm:py-6 text-sm sm:text-base">Redirigiendo...</p>;
    }

    // Profesores: Indicador de carga animado mientras se obtienen datos
    if (loading) {
        return <p className="text-center text-blue-500 font-semibold animate-pulse py-4 sm:py-6 text-sm sm:text-base">Cargando órdenes...</p>;
    }

    return (
        // Profesores: Contenedor principal con ancho máximo responsivo y padding escalado
        <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8 max-w-full sm:max-w-4xl mx-auto">
            {/* Profesores: Título con brillo rosa al hover, tamaño ajustado */}
            <h2
                className="text-xl sm:text-2xl md:text-3xl font-bold text-pink-600 mb-4 sm:mb-6 text-center hover:text-pink-400 hover:shadow-[0_0_10px_rgba(255,105,180,0.8)] transition-all duration-300"
            >
                📦 Todas las Órdenes
            </h2>

            {ordenes.length === 0 ? (
                <p className="text-center text-gray-500 text-sm sm:text-base">No hay órdenes aún.</p>
            ) : (
                // Profesores: Cuadrícula responsiva para mostrar órdenes
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                    {ordenes.map((orden) => (
                        // Profesores: Tarjeta de orden con borde lateral y sombra dinámica
                        <div
                            key={orden.id}
                            className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-xl p-4 sm:p-5 border-l-4 border-blue-400"
                        >
                            <p className="text-base sm:text-lg font-semibold text-blue-600">
                                🆔 Orden: <span className="text-gray-800">{orden.id}</span>
                            </p>
                            <p className="text-gray-600 text-sm sm:text-base">
                                <strong>Usuario:</strong> {orden.usuario?.email || "Usuario no especificado"}
                            </p>
                            <p className="text-gray-600 text-sm sm:text-base">
                                <strong>Total:</strong> <span className="font-bold text-pink-500">${orden.total}</span>
                            </p>
                            <p
                                className={`mt-2 inline-block px-2 sm:px-3 py-1 rounded-full text-white text-xs sm:text-sm font-semibold ${
                                    orden.estado === "pendiente"
                                        ? "bg-yellow-500"
                                        : orden.estado === "completada"
                                        ? "bg-green-500"
                                        : "bg-gray-400"
                                }`}
                            >
                                {orden.estado}
                            </p>
                            <p className="text-gray-600 mt-2 text-sm sm:text-base">
                                <strong>Fecha:</strong>{" "}
                                {orden.fecha ? new Date(orden.fecha.toDate()).toLocaleString() : "Pendiente"}
                            </p>
                            <div className="mt-3 sm:mt-4">
                                <p className="font-semibold text-gray-700 text-sm sm:text-base">🛍️ Productos:</p>
                                {/* Profesores: Lista de productos con márgenes responsivos */}
                                <ul className="ml-3 sm:ml-4 list-disc text-gray-600 text-xs sm:text-sm">
                                    {(orden.productos ?? []).map((producto, index) => (
                                        <li key={index}>
                                            {producto.nombre} - {producto.cantidad} x{" "}
                                            <span className="font-bold">${producto.precio}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}