import Link from 'next/link';

const ProductosPage = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">Nuestros Productos</h1>
            <p>Selecciona una categoría para ver los productos:</p>
            <ul className="space-y-2">
                <li>
                    <Link href="/productos/smartphones" className="text-teal-500 hover:text-teal-700">Smartphones</Link>
                </li>
                <li>
                    <Link href="/productos/laptops" className="text-teal-500 hover:text-teal-700">Laptops</Link>
                </li>
                <li>
                    <Link href="/productos/fragrances" className="text-teal-500 hover:text-teal-700">Fragrances</Link>
                </li>
            </ul>
        </div>
    );
};

export default ProductosPage;