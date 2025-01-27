import Link from 'next/link';

const ProductCard = ({ producto }) => {
    return (
        <div className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{producto.title}</h2>
            <p>{producto.description}</p>
            <p>Precio: ${producto.price}</p>
            <Link href={`/productos/${producto.id}`} className="text-teal-500 hover:text-teal-700">
                Ver detalles
            </Link>
        </div>
    );
};

export default ProductCard;