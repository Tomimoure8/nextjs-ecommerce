import Link from "next/link"

export const Header = () => {
    return (
        <header className="w-full bg-gray-800 text-white shadow-md">
            <div className="container mx-auto py-6 flex justify-between items-center">
                <p className="text-4xl font-bold text-slate-100">Coderhouse</p>
                <nav className="flex justify-between gap-4">
                    <Link className="text-base text-slate-100 p-3 hover:bg-gray-700 rounded transition duration-50" href="/">Inicio</Link>
                    <Link className="text-base text-slate-100 p-3 hover:bg-gray-700 rounded transition duration-50" href="/">Enlace</Link>
                    <Link className="text-base text-slate-100 p-3 hover:bg-gray-700 rounded transition duration-50" href="/">Enlace 2</Link>
                </nav>
            </div>
        </header>
    )
}