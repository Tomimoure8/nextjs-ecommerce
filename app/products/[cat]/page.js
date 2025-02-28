import { getProducts } from "@/actions/fetchProducts";
import PageTitle from "@/components/products/PageTitle";
import ProductList from "@/components/products/ProductList";
import ProductListSection from "@/components/products/ProductListSection";

export default async function ProductsByCategoryPage({ params }) {
    const { cat } = await params;
    const { payload: products, error, message } = await getProducts(cat);

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
