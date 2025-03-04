import { fetchProducts } from "../actions/fetchProducts";
import ProductList from "./ProductList";
import PageTitle from "./products/PageTitle";

async function ProductListContainer({ categoria }) {
    const { payload: products, error, message } = await fetchProducts(categoria);

    if (error) {
        return (
            <>
                <PageTitle>Error</PageTitle>
                <p>{message}</p>
            </>
        );
    }

    return <ProductList productos={products} />;
}

export default ProductListContainer;
