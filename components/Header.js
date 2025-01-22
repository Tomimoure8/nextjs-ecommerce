"use client";

import { ShoppingCart } from "lucide-react"
import { useRouter } from 'next/navigation';
import Image from "next/image"

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/productos", label: "Productos" },
    { href: "/contact", label: "Contacto" },
    { href: "/carrito", label: "Carrito", icon: <ShoppingCart className="w-6 h-6" /> },
];

function Header() {
    const router = useRouter();

    const handleNavegacion = (href) => {
        router.push(href);
    };

    return (
        <header className="bg-teal-600 bg-gradient-to-r from-teal-300 text-white shadow-lg">
            <nav className="container mx-auto flex justify-between items-center py-4">
                <div onClick={() => handleNavegacion('/')} className="cursor-pointer">
                    <Image
                        src="/imagen-contacto_processed.jpg"
                        alt="imagen-logo"
                        width={100}
                        height={100}
                    />
                </div>
                <ul className="flex gap-6">
                    {navLinks.map((link) => (
                        <li key={link.href} onClick={() => handleNavegacion(link.href)} className="relative group cursor-pointer">
                            <span className="relative z-10 text-orange-500">{link.icon ? link.icon : link.label}</span>
                            <span className="absolute inset-0 bg-teal-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-lg"></span>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}

export default Header;