"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../src/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const { user, register, login } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);

    // Profesores: Redirige al usuario autenticado según su rol (admin o cliente)
    useEffect(() => {
        if (user) {
            if (user.role === "admin") {
                router.push("/admin");
            } else {
                router.push("/");
            }
        }
    }, [user, router]);

    // Profesores: Maneja el envío del formulario, valida campos y ejecuta registro o login
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Por favor, completa todos los campos.");
            return;
        }

        try {
            if (isRegistering) {
                await register(email, password);
            } else {
                await login(email, password);
            }
        } catch (err) {
            setError("Error en la autenticación. Verifica tus credenciales.");
        }
    };

    // Profesores: Mensaje de redirección mientras se verifica el usuario
    if (user) {
        return <p className="text-center text-blue-500 font-semibold animate-pulse py-4 sm:py-6 text-sm sm:text-base">Redirigiendo...</p>;
    }

    return (
        // Profesores: Contenedor centrado vertical y horizontalmente, padding responsivo
        <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6 md:p-8">
            {/* Profesores: Formulario con ancho máximo responsivo */}
            <div className="max-w-xs sm:max-w-md w-full text-center">
                {/* Profesores: Título con brillo rosa al hover, tamaño escalado */}
                <h2
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-pink-600 mb-4 sm:mb-6 hover:text-pink-400 hover:shadow-[0_0_10px_rgba(255,105,180,0.8)] transition-all duration-300"
                >
                    {isRegistering ? "✨ Registrarse" : "🔑 Iniciar Sesión"}
                </h2>
                {error && <p className="text-red-500 mb-3 sm:mb-4 text-sm sm:text-base">{error}</p>}

                {/* Profesores: Formulario con layout flexible y espaciado responsivo */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-sm sm:text-base"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-sm sm:text-base"
                    />
                    {/* Profesores: Botón con efecto "apretado" brillante al clic, transición vibrante */}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 sm:px-6 py-2 rounded-full hover:bg-pink-400 hover:shadow-[0_0_10px_rgba(255,105,180,0.8)] transition-all duration-200 shadow-md active:scale-95 active:shadow-[0_0_15px_rgba(255,105,180,1)] active:bg-pink-500 text-sm sm:text-base"
                    >
                        {isRegistering ? "Registrarse" : "Iniciar Sesión"}
                    </button>
                </form>

                {/* Profesores: Botón secundario para alternar entre login y registro */}
                <button
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="mt-3 sm:mt-4 text-yellow-400 hover:text-pink-500 transition-colors text-sm sm:text-base"
                >
                    {isRegistering ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
                </button>
            </div>
        </div>
    );
}