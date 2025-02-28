import Image from "next/image";
import Link from "next/link";
import PropTypes from 'prop-types';
import AddToCartButton from "./AddToCartButton";

function ProductCard({ product }) {
    return (
        <div className="p-4 shadow-md rounded-md">
            <Image 
                src={product.image || "https://placehold.co/600x400?text=No+Image"} 
                alt={`Imagen de ${product.name}`} 
                width={300} 
                height={300} 
                className="object-cover rounded-t-md"
                onError={(e) => e.target.src = "https://placehold.co/600x400?text=Image+Not+Found"}
            />
            <div className="p-4">
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="text-lg">$ {product.price}</p>
                <Link href={`/product/${product.id}`}>
                    <a className="text-blue-500 hover:underline">Ver detalles</a>
                </Link>
                <AddToCartButton product={product} />
            </div>
        </div>
    );
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string,
        category: PropTypes.string.isRequired,
    }).isRequired,
};

export default ProductCard;
