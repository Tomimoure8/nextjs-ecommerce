'use client';
import { useEffect, useState } from 'react';
import ProductList from './ProductList';
import MenuCategorias from './MenuCategorias';

const ProductosCategoriaCliente = ({ categoriaInicial }) => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoria, setCategoria] = useState(categoriaInicial);

    useEffect(() => {
        async function loadProductos() {
            try {
                const res = await fetch('/api/productos', { cache: 'no-store' });
                if (!res.ok) {
                    throw new Error('Error al obtener los productos');
                }
                const data = await res.json();
                // Filtrar productos por categoría
                const productosFiltrados = categoria === 'todos' ? data : data.filter(producto => producto.category === categoria);
                setProductos(productosFiltrados);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadProductos();
    }, [categoria]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const categorias = ['todos', 'beauty', 'laptops', 'fragrances']; // Ajusta esto según las categorías de la API externa

    return (
        <div className="container mx-auto p-4 flex">
            <MenuCategorias categorias={categorias} onSelectCategoria={setCategoria} />
            <div className="flex-grow p-4">
                <h1 className="text-4xl font-bold mb-4">Productos de la categoría {categoria}</h1>
                <ProductList productos={productos} />
            </div>
        </div>
    );
};

export default ProductosCategoriaCliente;