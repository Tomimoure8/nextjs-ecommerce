import { fetchProducts } from "../../../src/actions/fetchProducts";
import PageTitle from "../../../src/components/products/PageTitle";
import ProductListSection from "../../../src/components/products/ProductListSection";

export default async function ProductsByCategoryPage({ params }) {
    const { cat } = await params;
    const { payload: products, error, message } = await fetchProducts(cat);

    if (error) {
        return (
            <>
                <PageTitle>Error</PageTitle>
                <p>{message}</p>
            </>
        );
    }

    return (
        <>
            <PageTitle>Productos de {cat}</PageTitle>
            <ProductListSection categoria={cat} />
        </>
    );
}
