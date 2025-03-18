import Image from "next/image";
import { useCart } from "../context/CartContext";

export default function ProductCard({ producto }) {
    const { addToCart } = useCart();

    // Profesores: Manejo de caso de carga, muestra un mensaje animado si no hay producto
    if (!producto) {
        return <p className="text-center text-blue-500 font-semibold animate-pulse text-sm sm:text-base">Cargando producto...</p>;
    }

    // Profesores: Valores por defecto para evitar errores si faltan datos en Firestore
    const nombre = producto.nombre || "Producto sin nombre";
    const imagen = producto.imagen || "/images/default.jpg";
    const descripcion = producto.descripcion || "Sin descripción";
    const precio = producto.precio ? `$${producto.precio}` : "Precio no disponible";

    return (
        // Profesores: Tarjeta con diseño flexible, sombra dinámica y altura completa para consistencia en cuadrícula
        <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-3 sm:p-4 flex flex-col justify-between h-full">
            <div>
                {/* Profesores: Título con brillo rosa al hover, tamaño ajustado para responsividad */}
                <h2
                    className="text-lg sm:text-xl font-semibold text-pink-600 mb-2 text-center hover:text-pink-400 hover:shadow-[0_0_10px_rgba(255,105,180,0.8)] transition-all duration-300"
                >
                    {nombre}
                </h2>
                {/* Profesores: Contenedor de imagen con altura fija, responsiva y recorte para uniformidad */}
                <div className="relative w-full h-40 sm:h-48 mb-2 sm:mb-3">
                    <Image
                        src={imagen}
                        alt={`Imagen de ${nombre}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                        priority
                    />
                </div>
                {/* Profesores: Descripción truncada a 2 líneas para mantener el diseño compacto */}
                <p className="text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-2">{descripcion}</p>
                {/* Profesores: Precio destacado en amarillo, tamaño ajustado */}
                <p className="text-yellow-400 font-bold text-base sm:text-lg mb-2 sm:mb-3">{precio}</p>
            </div>
            {/* Profesores: Botón con efecto "apretado" brillante al clic, transición vibrante al hover */}
            <button
                onClick={() => addToCart(producto)}
                className="bg-blue-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full hover:bg-pink-400 hover:shadow-[0_0_10px_rgba(255,105,180,0.8)] transition-all duration-200 shadow-md active:scale-95 active:shadow-[0_0_15px_rgba(255,105,180,1)] active:bg-pink-500 flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base"
            >
                <span>🛒</span> Agregar al Carrito
            </button>
        </div>
    );
}