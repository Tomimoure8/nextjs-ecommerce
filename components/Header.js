import { ShoppingCart } from "lucide-react"
import Link from "next/link"

function Header() {
    return (
        <header className="px-4 py-6 flex justify-between items-center bg-gradient-to-r from-green-400 via-purple-500 to-yellow-500 shadow-lg text-white">
            <h1 className="font-bold text-2xl tracking-wide">Comision 71810</h1>
            <nav className="flex gap-6">
                <Link href="/" className="hover:text-yellow-300 transition-colors duration-300 ease-in-out">Home</Link>
                <Link href="/product" className="hover:text-yellow-300 transition-colors duration-300 ease-in-out">Productos</Link>
                <Link href="/contact" className="hover:text-yellow-300 transition-colors duration-300 ease-in-out">Contacto</Link>
                <Link href="/carrito" className="relative hover:text-yellow-300 transition-colors duration-300 ease-in-out">
                    <ShoppingCart className="w-6 h-6" />
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">3</span>
                </Link>
            </nav>
        </header>
    )
}
export default Header