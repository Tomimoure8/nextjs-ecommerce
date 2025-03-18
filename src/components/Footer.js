"use client"

import { useState } from "react";

export default function Footer() {
    const [hovered, setHovered] = useState(false);

    return (
        <footer 
            className={`relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-6 sm:py-8 mt-6 transition-all duration-500 ${
                hovered ? "shadow-[0px_0px_20px_rgba(139,92,246,0.7)] scale-105" : "shadow-none"
            }`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-sm sm:text-base">
                <p className="font-semibold tracking-wide">
                    &copy; {new Date().getFullYear()} <span className="text-yellow-400">Digital Shop</span>. Todos los derechos reservados.
                </p>
                <p className="mt-2 text-gray-200">
                    Desarrollado por <span className="text-pink-400 font-bold">Tomás y Matias</span>
                </p>

                {/* Barra de separación animada */}
                <div className="w-24 mx-auto mt-3 h-1 bg-gray-300 rounded-full transition-all duration-300 hover:w-36 hover:bg-yellow-400"></div>

                {/* Redes Sociales */}
                <div className="flex justify-center mt-4 space-x-6">
                    <a href="#" className="text-gray-300 hover:text-yellow-400 transition transform hover:scale-110">
                        🌎 Sitio Web
                    </a>
                    <a href="#" className="text-gray-300 hover:text-yellow-400 transition transform hover:scale-110">
                        📷 Instagram
                    </a>
                    <a href="#" className="text-gray-300 hover:text-yellow-400 transition transform hover:scale-110">
                        🐦 Twitter
                    </a>
                </div>
            </div>
        </footer>
    );
}