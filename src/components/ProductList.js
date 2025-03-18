"use client";

import { useEffect, useState } from "react";
import { getProductos } from "../firebase/firestore";
import ProductCard from "./ProductCard";

export default function ProductList() {
    const [productos, setProductos] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");
    const [busqueda, setBusqueda] = useState("");

    // Profesores: useEffect para cargar productos desde Firestore al montar el componente
    useEffect(() => {
        async function fetchData() {
            const data = await getProductos();
            setProductos(data);
        }
        fetchData();
    }, []);

    // Profesores: Filtra productos por categoría y búsqueda, con manejo seguro de 'nombre'
    const productosFiltrados = productos.filter((producto) => {
        const nombreProducto = producto.nombre ? producto.nombre.toLowerCase() : "";
        return (
            (categoriaSeleccionada === "todos" || producto.categoria === categoriaSeleccionada) &&
            (busqueda === "" || nombreProducto.includes(busqueda.toLowerCase()))
        );
    });

    return (
        // Profesores: Contenedor centrado con borde amarillo al hover, responsivo con padding ajustado
        <div className="max-w-full sm:max-w-6xl mx-auto bg-white border-2 border-transparent hover:border-yellow-300 hover:shadow-lg transition-all duration-500 rounded-lg p-4 sm:p-6">
            {/* Profesores: Título con gradiente, escala y subrayado dinámico, tamaño ajustado para responsividad */}
            <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 
                        mb-4 sm:mb-6 text-center transition-transform duration-300 transform hover:scale-105 
                        relative before:absolute before:bottom-[-5px] before:left-1/2 before:w-0 before:h-[3px] before:bg-yellow-400 
                        before:transition-all before:duration-300 before:ease-in-out hover:before:w-[60px] sm:hover:before:w-[100px] hover:before:left-[50%] hover:before:translate-x-[-50%]"
            >
                🛍️ Lista de Productos
            </h2>

            {/* Profesores: Buscador con diseño responsivo, ancho completo */}
            <div className="mb-4 sm:mb-6">
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                            text-gray-800 shadow-sm hover:shadow-md transition-shadow text-sm sm:text-base"
                />
            </div>

            {/* Profesores: Filtros de categoría en layout flexible, apilado en móvil */}
            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                <label className="text-gray-700 font-semibold text-sm sm:text-base">Filtrar por categoría:</label>
                <select
                    value={categoriaSeleccionada}
                    onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                    className="w-full sm:w-auto p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                            text-gray-800 bg-white shadow-sm hover:shadow-md transition-shadow text-sm sm:text-base"
                >
                    <option value="todos">Todos</option>
                    <option value="tecnologia">Tecnología</option>
                    <option value="cargadores">Cargadores</option>
                    <option value="mouse">Mouse</option>
                    <option value="monitores">Monitores</option>
                    <option value="teclados">Teclados</option>
                    <option value="auriculares">Auriculares</option>
                    <option value="mobiliario">Mobiliario</option>
                    <option value="almacenamiento">Almacenamiento</option>
                    <option value="accesorios">Accesorios</option>
                </select>
            </div>

            {/* Profesores: Cuadrícula de productos responsiva, ajusta columnas según tamaño de pantalla */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {productosFiltrados.length > 0 ? (
                    productosFiltrados.map((producto) => (
                        <ProductCard key={producto.id} producto={producto} />
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-full text-sm sm:text-base">
                        No hay productos que coincidan con la búsqueda.
                    </p>
                )}
            </div>
        </div>
    );
}