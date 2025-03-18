"use client";

import { useAuth } from "../../src/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Footer from "../../src/components/Footer"; // Profesores: Importación del footer reusable

export default function AdminPage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    // Profesores: Redirige al login si no hay usuario autenticado una vez que termina la carga
    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    // Profesores: Indicador de carga mientras se verifica la autenticación
    if (loading || !user) {
        return <p className="text-center text-blue-500 font-semibold animate-pulse py-4 sm:py-6 text-sm sm:text-base">Cargando...</p>;
    }

    return (
        // Profesores: Contenedor principal con ancho máximo responsivo y padding escalado
        <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8 max-w-full sm:max-w-4xl mx-auto">
            {/* Profesores: Título con brillo rosa al hover, tamaño ajustado */}
            <h2
                className="text-xl sm:text-2xl md:text-3xl font-bold text-pink-600 mb-4 sm:mb-6 text-center hover:text-pink-400 hover:shadow-[0_0_10px_rgba(255,105,180,0.8)] transition-all duration-300"
            >
                ⚙️ Panel de Administración
            </h2>
            {/* Profesores: Saludo personalizado con email destacado */}
            <p className="text-gray-700 text-base sm:text-lg text-center mb-6 sm:mb-8">
                Bienvenido, <span className="font-semibold text-blue-500">{user.email}</span>
            </p>
            {/* Profesores: Botón centrado en layout flexible */}
            <div className="flex justify-center">
                <button
                    onClick={logout}
                    className="bg-yellow-400 text-gray-800 px-4 sm:px-6 py-2 rounded-full hover:bg-pink-400 hover:shadow-[0_0_10px_rgba(255,105,180,0.8)] transition-all duration-200 shadow-md active:scale-95 active:shadow-[0_0_15px_rgba(255,105,180,1)] active:bg-pink-500 active:text-white text-sm sm:text-base"
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}