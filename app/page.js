"use client";

import ProductList from "../src/components/ProductList";

export default function Home() {
    return (
        // Profesores: Contenedor principal con altura mínima de pantalla y fondo blanco,
        // padding ajustado para responsividad (4 en móvil, 6 en pantallas mayores)
        <div className="min-h-screen bg-white p-4 sm:p-6">
            {/* Profesores: Título principal con brillo rosa al hover, tamaño ajustado para responsividad */}
            <h1
                className="text-3xl sm:text-4xl font-bold text-pink-600 mb-6 sm:mb-8 text-center hover:text-pink-400 hover:shadow-[0_0_10px_rgba(255,105,180,0.8)] transition-all duration-300"
            >
                🏬 Bienvenido a Digital Shop
            </h1>
            {/* Profesores: Componente ProductList que muestra la lista de productos, hereda responsividad */}
            <ProductList />
        </div>
    );
}