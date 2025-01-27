import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ categoria }) => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadProductos() {
            try {
                const res = await fetch('/api/productos', { cache: 'no-store' });
                if (!res.ok) {
                    throw new Error('Failed to fetch productos');
                }
                const data = await res.json();
                const items = categoria === 'todos' ? data : data.filter((item) => item.categoria === categoria);
                setProductos(items);
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

    return (
        <section className="container m-auto flex justify-center items-center gap-12 flex-wrap">
            {productos.map((item) => (
                <ProductCard key={item.id} producto={item} />
            ))}
        </section>
    );
};

export default ProductList;