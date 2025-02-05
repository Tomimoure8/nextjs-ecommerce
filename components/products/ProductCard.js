import Image from "next/image";
import Link from "next/link";
import PropTypes from 'prop-types';
import AddToCartButton from "./AddToCartButton";

function ProductCard({ producto }) {
    return (
        <div className="p-4 shadow-md rounded-md">
            <Image 
                src={producto.image || "https://placehold.co/600x400?text=No+Image"} 
                alt={`Imagen de ${producto.name}`} 
                width={300} 
                height={300} 
                className="object-cover rounded-t-md"
                onError={(e) => e.target.src = "https://placehold.co/600x400?text=Image+Not+Found"}
            />
            <div className="p-4">
                <h2 className="text-xl font-bold">{producto.name}</h2>
                <p className="text-lg">$ {producto.price}</p>
                <Link href={`/product/${producto.id}`}>
                    <a className="text-blue-500 hover:underline">Ver detalles</a>
                </Link>
                <AddToCartButton producto={producto} />
            </div>
        </div>
    );
}

ProductCard.propTypes = {
    producto: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string,
    }).isRequired,
};

export default ProductCard;
