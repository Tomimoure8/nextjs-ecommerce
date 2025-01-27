import ProductosCategoriaCliente from '../../../components/products/ProductosCategoriaCliente';

export async function generateMetadata({ params }) {
    const { categoria } = params;
    return {
        title: `Productos de la categoría ${categoria} - ecommerce-platform`,
    };
}

const ProductosCategoria = ({ params }) => {
    const { categoria } = params;
    return (
        <ProductosCategoriaCliente categoriaInicial={categoria} />
    );
};

export default ProductosCategoria;