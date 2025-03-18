"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }) {
    const { user, role } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user === null) {
            router.push("/login");
        } else if (role !== "admin") {
            router.push("/");
        }
    }, [user, role, router]);

    if (user === null || role === null) {
        return <p className="text-center text-blue-500 font-semibold animate-pulse py-6">Cargando...</p>;
    }

    if (role !== "admin") {
        return null;
    }

    return (
        <div className="flex min-h-screen bg-white">
            <aside className="w-64 bg-blue-500 text-white p-5 flex-shrink-0">
                <h2 className="text-2xl font-bold text-yellow-300 mb-6">⚙️ Admin Panel</h2>
                <nav className="flex-1">
                    <ul className="space-y-3">
                        <li>
                            <a
                                href="/admin"
                                className="block py-2 px-3 rounded bg-pink-300 text-white hover:bg-yellow-400 hover:text-gray-800 transition-colors"
                            >
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a
                                href="/admin/productos"
                                className="block py-2 px-3 rounded hover:bg-pink-300 transition-colors"
                            >
                                Productos
                            </a>
                        </li>
                        <li>
                            <a
                                href="/admin/orders"
                                className="block py-2 px-3 rounded hover:bg-pink-300 transition-colors"
                            >
                                Órdenes
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>
            <div className="flex-1 flex flex-col">
                <main className="p-6 bg-white">{children}</main>
            </div>
        </div>
    );
}