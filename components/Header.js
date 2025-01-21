import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/product", label: "Productos" },
    { href: "/contact", label: "Contacto" },
    { href: "/carrito", label: "Carrito", icon: <ShoppingCart className="w-6 h-6" /> },
];

function Header() {
    return (
        <header className="px-4 py-6 flex justify-between items-center bg-gradient-to-r from-green-400 via-purple-500 to-yellow-500 shadow-lg text-white">
            <h1 className="font-bold text-2xl tracking-wide">Comision 71810</h1>
            <nav className="flex gap-6">
                <Link href="/">
                    <Image
                        src="/imagen-contacto_processed.jpg"
                        alt="imagen-logo"
                        width={100}
                        height={100}
                    />
                </Link>
                {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="hover:text-yellow-300 transition-colors duration-300 ease-in-out">
                        {link.icon ? (
                            <span className="relative">
                                {link.icon}
                                {link.label === "Carrito" && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">3</span>
                                )}
                            </span>
                        ) : (
                            link.label
                        )}
                    </Link>
                ))}
            </nav>
        </header>
    );
}
export default Header