"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Header() {
    const { cart, clearCart } = useCart();
    const { user, role, logout } = useAuth();
    const router = useRouter();

    const cantidadTotal = cart.reduce((acc, item) => acc + item.cantidad, 0);

    const handleLogout = async () => {
        try {
            await logout();
            router.push("/login");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    const handleClearCart = () => {
        clearCart();
    };

    return (
        <header className="bg-gradient-to-r from-pink-400 via-yellow-300 to-blue-500 text-white py-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center px-6">
                <nav className="flex items-center gap-6 text-lg font-semibold">
                    <Link href="/" className="hover:text-blue-500 transition">🏠 Inicio</Link>
                    <Link href="/checkout" className="relative hover:text-yellow-200 transition">
                        🛒 Carrito ({cantidadTotal})
                        {cantidadTotal > 0 && (
                            <button 
                                onClick={handleClearCart}
                                className="ml-2 text-purple-300 hover:text-red-700 transition"
                            >
                                ✖ Vaciar
                            </button>
                        )}
                    </Link>
                    {role === "admin" && (
                        <Link href="/admin" className="hover:text-blue-400 transition">⚙️ Admin</Link>
                    )}
                    {user && role === "user" && (
                        <Link href="/orders" className="hover:text-yellow-200 transition">📦 Mis Órdenes</Link>
                    )}
                </nav>
                <div>
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="bg-white text-pink-500 px-4 py-2 rounded-full hover:bg-pink-600 hover:text-white transition shadow-md"
                        >
                            Cerrar Sesión
                        </button>
                    ) : (
                        <Link 
                            href="/login"
                            className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition shadow-md"
                        >
                            Iniciar Sesión
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
